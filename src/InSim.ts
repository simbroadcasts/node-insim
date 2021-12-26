import EventEmitter from 'events';
import defaults from 'lodash/defaults';

import { IPacket } from './packets/IPacket';
import { INSIM_VERSION, IS_ISI, IS_ISI_Data } from './packets/IS_ISI';
import { IS_VER } from './packets/IS_VER';
import { packetMap } from './packets/packetMap';
import { PacketType } from './packets/packetTypes';
import { TCP } from './TCP';
import { unpack } from './utils/jspack';

type InSimOptions = IS_ISI_Data & {
  Protocol: 'tcp' | 'udp';
  Host: string;
  Port: number;
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

export class InSim extends EventEmitter {
  private options: InSimOptions = defaultInSimOptions;
  private connection: TCP;

  constructor() {
    super();
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
      console.log('InSim connected');
    });

    this.connection.on('disconnect', () => {
      // TODO send TINY_CLOSE
      this.emit('disconnect');
      console.log('InSim disconnected');
    });

    this.connection.on('packet', (data) => {
      const header = unpack('<BB', data);
      const packetType: PacketType = header[1];
      const packetTypeString = PacketType[packetType];
      const packetClass = packetMap[packetType] as typeof IS_VER;

      console.log('InSim packet received:', packetTypeString, data);

      if (packetClass === undefined) {
        console.error('Unknown packet received!');
        this.emit('error', { message: 'Unknown packet received' });

        return;
      }

      this.emit(packetTypeString, new packetClass().unpack(data));
    });
  }

  disconnect() {
    // TODO send TINY_CLOSE
    this.connection.disconnect();
  }

  send(packet: IPacket) {
    console.log('InSim send packet', packet);
    this.connection.send(packet.pack());
  }
}
