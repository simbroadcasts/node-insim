import defaults from 'lodash/defaults';
import { TypedEmitter } from 'tiny-typed-emitter';

import { InSimError } from '../errors';
import { log as baseLog } from '../log';
import { UDP } from '../UDP';
import { OutSimPack } from './OutSimPack';

const log = baseLog.extend('outsim');

type OutSimEvents = {
  packet: (packet: OutSimPack) => void;
  connect: () => void;
  disconnect: () => void;
  timeout: () => void;
};

type OutSimConnectionOptions = {
  Host: string;
  Port: number;
};

export class OutSim extends TypedEmitter<OutSimEvents> {
  private _options: OutSimConnectionOptions = defaultOutSimOptions;
  private connection: UDP | null = null;
  private timeout = 0;

  constructor(timeout = 0) {
    super();
    this.timeout = timeout;

    this.on('connect', () =>
      log(`Connected to ${this._options.Host}:${this._options.Port}`),
    );
    this.on('disconnect', () =>
      log(`Disconnected from ${this._options.Host}:${this._options.Port}`),
    );
  }

  connect(options: Partial<OutSimConnectionOptions>) {
    this._options = defaults(options, defaultOutSimOptions);

    log(`Connecting to ${this._options.Host}:${this._options.Port}...`);

    this.connection = new UDP(this.timeout);
    this.connection.connect(this._options.Host, this._options.Port);

    this.connection.on('connect', () => {
      this.emit('connect');
    });

    this.connection.on('disconnect', () => {
      this.emit('disconnect');
    });

    this.connection.on('error', (error: Error) => {
      throw new InSimError(`UDP connection error: ${error.message}`);
    });

    this.connection.on('message', (data) => this.handleMessage(data));

    this.connection.on('timeout', () => {
      this.emit('timeout');
    });
  }

  disconnect() {
    log('Disconnecting...');
    if (this.connection === null) {
      log('Cannot disconnect - not connected');
      return;
    }

    this.connection.disconnect();
  }

  private handleMessage(data: Uint8Array) {
    const outSimPack = new OutSimPack();
    this.emit('packet', outSimPack.unpack(data));
  }
}

OutSim.defaultMaxListeners = 255;

const defaultOutSimOptions: OutSimConnectionOptions = {
  Host: '127.0.0.1',
  Port: 29999,
};
