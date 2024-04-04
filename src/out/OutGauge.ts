import defaults from 'lodash/defaults';
import { TypedEmitter } from 'tiny-typed-emitter';

import { InSimError } from '../errors';
import { log as baseLog } from '../log';
import { UDP } from '../protocols';
import { OutGaugePack } from './OutGaugePack';

const log = baseLog.extend('outgauge');

type OutGaugeEvents = {
  packet: (packet: OutGaugePack) => void;
  connect: () => void;
  disconnect: () => void;
  timeout: () => void;
};

type OutGaugeConnectionOptions = {
  Host: string;
  Port: number;
};

export class OutGauge extends TypedEmitter<OutGaugeEvents> {
  private _options: OutGaugeConnectionOptions = defaultOutGaugeOptions;
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

  connect(options: Partial<OutGaugeConnectionOptions>) {
    this._options = defaults(options, defaultOutGaugeOptions);

    log(`Connecting to ${this._options.Host}:${this._options.Port}...`);

    this.connection = new UDP({
      host: this._options.Host,
      port: this._options.Port,
      timeout: this.timeout,
      socketInitialisationMode: 'bind',
    });
    this.connection.connect();

    this.connection.on('connect', () => {
      this.emit('connect');
    });

    this.connection.on('disconnect', () => {
      this.emit('disconnect');
    });

    this.connection.on('error', (error: Error) => {
      throw new InSimError(`UDP connection error: ${error.message}`);
    });

    this.connection.on('data', (data) => this.handleMessage(data));

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
    const outGaugePack = new OutGaugePack();
    this.emit('packet', outGaugePack.unpack(data));
  }
}

OutGauge.defaultMaxListeners = 255;

const defaultOutGaugeOptions: OutGaugeConnectionOptions = {
  Host: '127.0.0.1',
  Port: 29998,
};
