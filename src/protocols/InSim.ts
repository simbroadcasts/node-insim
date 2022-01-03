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
import { log } from '../utils/log';
import { TCP } from './TCP';

type InSimOptions = IS_ISI_Data & {
  Host: string;
  Port: number;
};

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
  test: () => void;
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
  private connection: TCP;

  constructor() {
    super();

    this.on('connect', () => log.info('InSim connected'));
    this.on('disconnect', () => log.info('InSim disconnected'));
    this.on('error', (error: InSimError) => log.error('InSim error', error));
    this.on(PacketType.ISP_TINY, (packet) => this.handleKeepAlive(packet));
  }

  connect(options?: Partial<InSimOptions>) {
    this.options = defaults(options, defaultInSimOptions);

    log.info('InSim connecting...');
    log.debug('InSim options:', this.options);

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
    this.send(new IS_TINY({ SubT: TinyType.TINY_CLOSE }));
    this.connection.disconnect();
  }

  send(packet: ISendable) {
    const data = packet.pack();
    log.info('Send packet:', PacketType[packet.Type]);
    log.debug('Send packet:', packet, data);

    this.connection.send(data);
  }

  private handlePacket(data: Buffer) {
    const header = unpack('<BB', data);
    const packetType: PacketType = header[1];
    const packetTypeString = PacketType[packetType];

    if (packetTypeString === undefined) {
      this.emit('error', new InSimError('Unknown packet received'));
      return;
    }

    switch (packetType) {
      case PacketType.ISP_ISI:
        this.emit(packetType, new IS_ISI().unpack(data), this);
        break;
      case PacketType.ISP_VER:
        this.emit(packetType, new IS_VER().unpack(data), this);
        break;
      case PacketType.ISP_TINY:
        this.emit(packetType, new IS_TINY().unpack(data), this);
        break;
      default:
        this.emit(
          'error',
          new InSimError(
            `Packet handler not implemented for ${packetTypeString}`,
          ),
        );
        break;
    }
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
}
