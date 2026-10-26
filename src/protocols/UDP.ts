import * as dgram from 'dgram';

import { log as baseLog } from '../log';
import { Protocol } from './Protocol';

const log = baseLog.extend('udp');

type SocketInitialisationMode = 'bind' | 'connect';

interface UDPOptions {
  host: string;
  port: number;
  socketInitialisationMode: SocketInitialisationMode;
  /** Local port to bind to in 'bind' mode. Defaults to `port`. */
  localPort?: number;
  /** Local address to bind to in 'bind' mode. Defaults to `host`. */
  bindAddress?: string;
  packetSizeMultiplier?: number;
  timeout?: number;
}

/** @internal */
export class UDP extends Protocol {
  private socket: dgram.Socket | null = null;
  private readonly timeout: number = 0;
  private timeoutTimer: NodeJS.Timeout | null = null;
  private readonly socketInitialisationMode: SocketInitialisationMode;
  private readonly localPort: number;
  private readonly bindAddress: string;

  constructor({
    host,
    port,
    socketInitialisationMode,
    localPort,
    bindAddress,
    packetSizeMultiplier = 1,
    timeout = 0,
  }: UDPOptions) {
    super({ host, port, packetSizeMultiplier });
    this.timeout = timeout;
    this.socketInitialisationMode = socketInitialisationMode;
    this.localPort = localPort ?? port;
    this.bindAddress = bindAddress ?? host;
  }

  connect = () => {
    this.socket = dgram.createSocket('udp4');
    log(`Connecting to ${this.host}:${this.port}...`);

    if (this.socketInitialisationMode === 'bind') {
      this.socket.bind({
        address: this.bindAddress,
        port: this.localPort,
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

    if (this.socketInitialisationMode === 'bind') {
      this.socket.send(data, this.port, this.host);
    } else {
      this.socket.send(data);
    }
  };

  handleTimeout = () => {
    log('Connection timed out');
    this.emit('timeout');
    this.timeoutTimer = null;
    this.disconnect();
  };
}
