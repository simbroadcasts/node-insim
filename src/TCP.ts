import EventEmitter from 'events';
import net from 'net';

import { copyBuffer } from './lfspack';
import { log as baseLog } from './log';

const log = baseLog.extend('tcp');

export class TCP extends EventEmitter {
  private stream: net.Socket | null = null;

  private readonly host: string;
  private readonly port: number;
  private readonly sizeMultiplier: number;

  tempBuf: Buffer | null = null;

  constructor(host: string, port: number, sizeMultiplier = 1) {
    super();
    this.host = host;
    this.port = port;
    this.sizeMultiplier = sizeMultiplier;
  }

  connect = () => {
    this.stream = net.connect(this.port, this.host);

    this.stream.on('connect', () => {
      this.emit('connect', this);
    });

    this.stream.on('close', () => {
      this.emit('disconnect', this);
    });

    this.stream.on('error', (error) => {
      this.emit('error', error);
    });

    this.stream.on('data', (data) => {
      log('Data received:', data instanceof Buffer ? data.join() : data);

      // Set or append to temp buffer
      if (this.tempBuf === null) {
        this.tempBuf = data;
      } else {
        this.tempBuf = Buffer.concat([this.tempBuf, data]);
      }

      this.processBuf();
    });
  };

  send = (data: Uint8Array) => {
    if (this.stream === null) {
      log('Cannot send data - not connected');
      return;
    }

    log('Send data:', data.join());
    this.stream.write(data);
  };

  disconnect = () => {
    if (this.stream === null) {
      log('Cannot disconnect - not connected');
      return;
    }

    this.stream.end();
  };

  processBuf() {
    if (this.tempBuf === null) {
      log('No buffer to process');
      return;
    }

    // Haven't got a full 32 bit header
    if (this.tempBuf.length < 4) {
      log('Got packet with <4 bytes');
      return;
    }

    const size = this.tempBuf[0] * this.sizeMultiplier;

    if (this.tempBuf.length === size) {
      // We have at least one full packet
      this.emit('packet', copyBuffer(this.tempBuf));

      this.tempBuf = null;
    } else if (this.tempBuf.length > size) {
      // Process first packet...
      this.emit('packet', copyBuffer(this.tempBuf.slice(0, size)));
      this.tempBuf = this.tempBuf.slice(size, this.tempBuf.length);
      // Recurse on remaining buffer
      this.processBuf();
    } else {
      log('Got incomplete packet');
    }
  }
}
