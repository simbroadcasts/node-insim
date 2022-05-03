import defaults from 'lodash/defaults';
import { TypedEmitter } from 'tiny-typed-emitter';

import {
  IS_ISI,
  IS_ISI_Data,
  IS_TINY,
  IS_VER,
  ISendable,
  PacketType,
  TinyType,
} from '../packets';
import { unpack } from '../utils/jspack';
import { createLog } from '../utils/log';
import { TCP } from './TCP';

const log = createLog('InSim');

type InSimConnectionOptions = {
  Host: string;
  Port: number;
};

type InSimOptions = IS_ISI_Data & InSimConnectionOptions;

export type InSimPacketEvents = {
  [PacketType.ISP_ISI]: (packet: IS_ISI, insim: InSim) => void;
  [PacketType.ISP_VER]: (packet: IS_VER, insim: InSim) => void;
  [PacketType.ISP_TINY]: (packet: IS_TINY, insim: InSim) => void;
};

export const INSIM_VERSION = 9;

class InSimError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InSimError';
  }
}

export type InSimEvents = InSimPacketEvents & {
  connect: () => void;
  disconnect: () => void;
  error: (error: InSimError) => void;
};

const defaultInSimOptions: InSimOptions = {
  Host: '127.0.0.1',
  Port: 29999,
  ReqI: 0,
  UDPPort: 0,
  Flags: 0,
  InSimVer: INSIM_VERSION,
  Prefix: '',
  Interval: 0,
  Admin: '',
  IName: '',
};

export class InSim extends TypedEmitter<InSimEvents> {
  private options: InSimOptions = defaultInSimOptions;
  private connection: TCP | null = null;

  constructor() {
    super();

    this.on('connect', () => log.info('Connected'));
    this.on('disconnect', () => log.info('Disconnected'));
    this.on(PacketType.ISP_TINY, (packet) => this.handleKeepAlive(packet));
  }

  connect(options: Partial<IS_ISI_Data> & InSimConnectionOptions) {
    this.options = defaults(options, defaultInSimOptions);

    log.info('Connecting...');
    log.debug('Options:', this.options);

    if (options.IName && options.IName.length > 15) {
      this.handleError(
        'InSim option "IName" must not be greater than 15 characters',
      );
      return;
    }

    this.connection = new TCP(this.options.Host, this.options.Port);
    this.connection.connect();

    this.connection.on('connect', () => {
      this.send(
        new IS_ISI({
          Flags: this.options.Flags,
          Prefix: this.options.Prefix,
          Admin: this.options.Admin,
          UDPPort: this.options.UDPPort,
          ReqI: this.options.ReqI,
          Interval: this.options.Interval,
          IName: this.options.IName,
          InSimVer: this.options.InSimVer,
        }),
      );
      this.emit('connect');
    });

    this.connection.on('disconnect', () => {
      this.emit('disconnect');
    });

    this.connection.on('packet', (data) => this.handlePacket(data));
  }

  disconnect() {
    if (this.connection === null) {
      log.debug('Cannot disconnect - not connected');
      return;
    }

    this.send(new IS_TINY({ SubT: TinyType.TINY_CLOSE }));
    this.connection.disconnect();
  }

  send(packet: ISendable) {
    if (this.connection === null) {
      log.debug('Cannot send a packet - not connected');
      return;
    }

    log.info('Send packet:', PacketType[packet.Type]);
    log.debug('Send packet:', packet);

    const data = packet.pack();

    this.connection.send(data);
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
      const packetModule = require(`../packets/${packetClassName}`);
      PacketClass = packetModule[packetClassName];
    } catch (e) {
      this.handleError(
        `Packet handler not found for ${packetTypeString} (class ${packetClassName})`,
      );
      return;
    }

    this.emit(
      packetType as keyof InSimPacketEvents,
      new PacketClass(data),
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
    log.error('Error', message);
    this.emit('error', new InSimError(message));
  }
}
