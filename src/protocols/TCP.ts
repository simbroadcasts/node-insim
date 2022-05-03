import EventEmitter from 'events';
import net from 'net';

import { createLog } from '../utils/log';

const log = createLog('TCP');

export class TCP extends EventEmitter {
  private stream: net.Socket | null = null;

  private readonly host: string;
  private readonly port: number;

  tempBuf: Buffer | null = null;

  constructor(host: string, port: number) {
    super();
    this.host = host;
    this.port = port;

    this.on('connect', () =>
      log.info(`Connected to ${this.host}:${this.port}`),
    );
    this.on('disconnect', () => log.info('Disconnected'));
    this.on('packet', (data) => log.debug('Packet received:', data));
  }

  connect = () => {
    log.info('Connecting...');
    this.stream = net.connect(this.port, this.host);

    this.stream.on('connect', () => {
      this.emit('connect', this);
    });

    this.stream.on('close', () => {
      this.emit('disconnect', this);
    });

    this.stream.on('error', (error) => {
      log.error('Error', error.name, error.message);
    });

    this.stream.on('data', (data: string) => {
      log.debug('Data received:', data);

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
      log.debug('Cannot send data - not connected');
      return;
    }

    log.debug('Send data', data);
    this.stream.write(data);
  };

  disconnect = () => {
    if (this.stream === null) {
      log.debug('Cannot disconnect - not connected');
      return;
    }

    this.stream.end();
  };

  processBuf() {
    if (this.tempBuf === null) {
      log.warn('No buffer to process');
      return;
    }

    // Haven't got a full 32 bit header
    if (this.tempBuf.length < 4) {
      log.warn('Got packet with <4 bytes');
      return;
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
      log.warn('Got incomplete packet');
    }
  }
}
