import * as dgram from 'dgram';

import { log as baseLog } from '../log';
import { Protocol } from './Protocol';

const log = baseLog.extend('udp');

type SocketInitialisationMode = 'bind' | 'connect';

interface UDPOptions {
  host: string;
  port: number;
  socketInitialisationMode: SocketInitialisationMode;
  packetSizeMultiplier?: number;
  timeout?: number;
}

/** @internal */
export class UDP extends Protocol {
  private socket: dgram.Socket | null = null;
  private readonly timeout: number = 0;
  private timeoutTimer: NodeJS.Timeout | null = null;
  private readonly socketInitialisationMode: SocketInitialisationMode;

  constructor({
    host,
    port,
    socketInitialisationMode,
    packetSizeMultiplier = 1,
    timeout = 0,
  }: UDPOptions) {
    super({ host, port, packetSizeMultiplier });
    this.timeout = timeout;
    this.socketInitialisationMode = socketInitialisationMode;
  }

  connect = () => {
    this.socket = dgram.createSocket('udp4');
    log(`Connecting to ${this.host}:${this.port}...`);

    if (this.socketInitialisationMode === 'bind') {
      this.socket.bind({
        address: this.host,
        port: this.port,
      });
      this.socket.on('listening', () => {
        log('Listening');
        this.emit('connect');
      });
    } else if (this.socketInitialisationMode === 'connect') {
      this.socket.connect(this.port, this.host);
      this.socket.on('connect', () => {
        log('Connected');
        this.emit('connect');
      });
    }

    if (this.timeout > 0) {
      this.timeoutTimer = setTimeout(this.handleTimeout, this.timeout);
    }

    this.socket.on('close', () => {
      log('Connection closed');
      this.emit('disconnect');
    });

    this.socket.on('error', (error) => {
      log('Error', error);
      this.emit('error', error);
    });

    this.socket.on('message', (data: Uint8Array<ArrayBuffer>) => {
      log('Data received:', data.join());
      this.emit('data', data);

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

  send = (data: Uint8Array<ArrayBuffer>) => {
    if (this.socket === null) {
      log('Cannot send - not connected');
      return;
    }

    log('Send data:', data.join());
    this.socket.send(data);
  };

  handleTimeout = () => {
    log('Connection timed out');
    this.emit('timeout');
    this.timeoutTimer = null;
    this.disconnect();
  };
}
