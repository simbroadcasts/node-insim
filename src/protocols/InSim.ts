import defaults from 'lodash/defaults';
import { TypedEmitter } from 'tiny-typed-emitter';

import { IPacket } from '../packets/IPacket';
import { INSIM_VERSION, IS_ISI, IS_ISI_Data } from '../packets/IS_ISI';
import { IS_VER } from '../packets/IS_VER';
import { PacketType } from '../packets/packetTypes';
import { unpack } from '../utils/jspack';
import { TCP } from './TCP';

type InSimOptions = IS_ISI_Data & {
  Protocol: 'tcp' | 'udp';
  Host: string;
  Port: number;
};

export type InSimPacketEvents = {
  [PacketType.ISP_ISI]: (packet: IS_ISI, insim: InSim) => void;
  [PacketType.ISP_VER]: (packet: IS_VER, insim: InSim) => void;
};

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
  Protocol: 'tcp',
  ReqI: 0,
  UDPPort: 0,
  Flags: 0,
  InSimVer: INSIM_VERSION,
  Prefix: '!',
  Interval: 0,
  Admin: '',
  IName: '',
};

export class InSim extends TypedEmitter<InSimEvents> {
  private options: InSimOptions = defaultInSimOptions;
  private connection: TCP;

  constructor() {
    super();

    this.on('connect', () => console.log('InSim: connected'));
    this.on('disconnect', () => console.log('InSim: disconnected'));
  }

  connect(options?: Partial<InSimOptions>) {
    this.options = defaults(options, defaultInSimOptions);
    console.log('InSim options:', this.options);

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
      // TODO send TINY_CLOSE
      this.emit('disconnect');
    });

    this.connection.on('packet', (data) => this.handlePacket(data));
  }

  disconnect() {
    // TODO send TINY_CLOSE
    this.connection.disconnect();
  }

  send(packet: IPacket) {
    console.log('InSim send packet', packet);
    this.connection.send(packet.pack());
  }

  private handlePacket(data: Buffer) {
    const header = unpack('<BB', data);
    const packetType: PacketType = header[1];
    const packetTypeString = PacketType[packetType];

    console.log('InSim: packet received:', packetTypeString, data);

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
}
