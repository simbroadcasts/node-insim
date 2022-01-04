import EventEmitter from 'events';
import net from 'net';

import { log } from '../utils/log';

export class TCP extends EventEmitter {
  private stream: net.Socket = null;

  private readonly host: string;
  private readonly port: number;

  tempBuf: Buffer = null;

  constructor(host: string, port: number) {
    super();
    this.host = host;
    this.port = port;

    this.on('connect', () =>
      log.info(`TCP connected to ${this.host}:${this.port}`),
    );
    this.on('disconnect', () => log.info('TCP disconnected'));
    this.on('packet', (data) => log.debug('TCP packet received:', data));
  }

  connect = () => {
    log.info('TCP connecting...');
    this.stream = net.connect(this.port, this.host);

    this.stream.on('connect', () => {
      this.emit('connect', this);
    });

    this.stream.on('close', () => {
      this.emit('disconnect', this);
    });

    this.stream.on('error', (error) => {
      log.error('TCP error', error.name, error.message);
    });

    this.stream.on('data', (data: string) => {
      log.debug('TCP data received:', data);

      // Set or append to temp buffer
      if (this.tempBuf === null) {
        this.tempBuf = Buffer.from(data, 'binary');
      } else {
        this.tempBuf = Buffer.concat([
          this.tempBuf,
          Buffer.from(data, 'binary'),
        ]);
      }

      this.processBuf();
    });
  };

  send = (data: Uint8Array | string) => {
    if (this.stream === null) {
      return;
    }

    this.stream.write(data);
  };

  disconnect = () => {
    if (this.stream === null) {
      return;
    }

    this.stream.end();
  };

  processBuf() {
    if (this.tempBuf.length < 4) {
      log.warn('processBuf: Got packet with <4 bytes');
      return; // Haven't got a full 32 bit header
    }

    const size = this.tempBuf[0] * 4;

    if (this.tempBuf.length === size) {
      // We have at least one full packet
      this.emit('packet', this.tempBuf);

      this.tempBuf = null;
    } else if (this.tempBuf.length > size) {
      // Process first packet...
      this.emit('packet', this.tempBuf.slice(0, size));
      this.tempBuf = this.tempBuf.slice(size, this.tempBuf.length);
      // Recurse on remaining buffer
      this.processBuf();
    } else {
      log.warn('TCP: Got incomplete packet');
    }
  }
}
