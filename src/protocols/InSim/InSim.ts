import defaults from 'lodash/defaults';
import { TypedEmitter } from 'tiny-typed-emitter';

import type { IS_ISI_Data, SendablePacket } from '../../packets';
import { IS_ISI, IS_TINY, PacketType, TinyType } from '../../packets';
import { log as baseLog, unpack } from '../../utils';
import { TCP } from '../TCP';
import type { InSimEvents, InSimPacketEvents } from './InSimEvents';
import { InSimError } from './InSimEvents';

const log = baseLog.extend('insim');

type InSimConnectionOptions = {
  Host: string;
  Port: number;
};

export type InSimOptions = IS_ISI_Data & InSimConnectionOptions;

export class InSim extends TypedEmitter<InSimEvents> {
  static INSIM_VERSION = 9;
  private _options: InSimOptions = defaultInSimOptions;

  private connection: TCP | null = null;
  constructor() {
    super();

    this.on('connect', () => log('Connected'));
    this.on('disconnect', () => log('Disconnected'));
    this.on(PacketType.ISP_TINY, (packet) => this.handleKeepAlive(packet));
  }

  connect(options: Partial<IS_ISI_Data> & InSimConnectionOptions) {
    this._options = defaults(options, defaultInSimOptions);

    log('Connecting...');
    log('Options:', this._options);

    this.connection = new TCP(this._options.Host, this._options.Port);
    this.connection.connect();

    this.connection.on('connect', () => {
      this.send(
        new IS_ISI({
          Flags: this._options.Flags,
          Prefix: this._options.Prefix,
          Admin: this._options.Admin,
          UDPPort: this._options.UDPPort,
          ReqI: this._options.ReqI,
          Interval: this._options.Interval,
          IName: this._options.IName,
          InSimVer: this._options.InSimVer,
        }),
      );
      this.emit('connect');
    });

    this.connection.on('disconnect', () => {
      this.emit('disconnect');
    });

    this.connection.on('error', (error: Error) => {
      throw new InSimError(`TCP connection error: ${error.message}`);
    });

    this.connection.on('packet', (data) => this.handlePacket(data));
  }

  disconnect() {
    log('Disconnecting...');
    if (this.connection === null) {
      log('Cannot disconnect - not connected');
      return;
    }

    this.connection.disconnect();
  }

  send(packet: SendablePacket) {
    if (this.connection === null) {
      log('Cannot send a packet - not connected');
      return;
    }

    log('Send packet:', PacketType[packet.Type], packet);

    const data = packet.pack();

    this.connection.send(data);
  }

  get options(): InSimOptions {
    return this._options;
  }

  private handlePacket(data: Buffer) {
    const header = unpack('<BB', data);

    if (header === undefined) {
      this.handleError(`Incomplete packet header received: ${data.toJSON()}`);
      return;
    }

    const packetType: PacketType = header[1];

    const packetTypeString = PacketType[packetType];

    if (packetTypeString === undefined) {
      this.handleError(`Unknown packet received: ${data.toJSON()}`);
      return;
    }

    const packetClassName = packetTypeString.replace(/^ISP_/, 'IS_');
    let PacketClass;

    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const packetModule = require(`../../packets/${packetClassName}`);
      PacketClass = packetModule[packetClassName];
    } catch (e) {
      this.handleError(
        `Packet handler not found for ${packetTypeString} (class ${packetClassName})`,
      );
      return;
    }

    this.emit(
      packetType as keyof InSimPacketEvents,
      new PacketClass().unpack(data),
      this,
    );
  }

  private handleKeepAlive(packet: IS_TINY) {
    if (packet.SubT === TinyType.TINY_NONE) {
      this.send(
        new IS_TINY({
          SubT: TinyType.TINY_NONE,
        }),
      );
    }
  }

  private handleError(message: string) {
    this.emit('error', new InSimError(message));
  }
}

InSim.defaultMaxListeners = 255;

const defaultInSimOptions: InSimOptions = {
  Host: '127.0.0.1',
  Port: 29999,
  ReqI: 0,
  UDPPort: 0,
  Flags: 0,
  InSimVer: InSim.INSIM_VERSION,
  Prefix: '',
  Interval: 0,
  Admin: '',
  IName: '',
};
