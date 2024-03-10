import * as dgram from 'dgram';
import { TypedEmitter } from 'tiny-typed-emitter';

import { log as baseLog } from '../log';

const log = baseLog.extend('udp');

type UDPEvents = {
  connect: () => void;
  disconnect: () => void;
  message: (message: Buffer) => void;
  error: (error: Error) => void;
  timeout: () => void;
};

/** @internal */
export class UDP extends TypedEmitter<UDPEvents> {
  private socket: dgram.Socket | null = null;
  private timeout = 0;
  private timeoutTimer: NodeJS.Timeout | null = null;

  constructor(timeout = 0) {
    super();
    this.timeout = timeout;
  }

  connect = (host: string, port: number) => {
    this.socket = dgram.createSocket('udp4');
    this.socket.bind({
      address: host,
      port,
    });

    if (this.timeout > 0) {
      this.timeoutTimer = setTimeout(this.handleTimeout, this.timeout);
    }

    this.socket.on('listening', () => {
      log('Connected');
      this.emit('connect');
    });

    this.socket.on('close', () => {
      this.emit('disconnect');
    });

    this.socket.on('error', (error) => {
      this.emit('error', error);
    });

    this.socket.on('message', (data) => {
      log('Data received:', data.join());
      this.emit('message', data);

      if (this.timeoutTimer) {
        clearTimeout(this.timeoutTimer);
      }

      if (this.timeout) {
        this.timeoutTimer = setTimeout(this.handleTimeout, this.timeout);
      }
    });
  };

  disconnect = () => {
    if (this.socket === null) {
      log('Cannot disconnect - not connected');
      return;
    }

    this.socket.close();

    if (this.timeoutTimer) {
      clearTimeout(this.timeoutTimer);
      this.timeoutTimer = null;
    }
  };

  handleTimeout = () => {
    log('Connection timed out');
    this.emit('timeout');
    this.timeoutTimer = null;
    this.disconnect();
  };
}
