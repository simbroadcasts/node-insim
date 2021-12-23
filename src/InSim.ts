import EventEmitter from 'events';
import defaults from 'lodash/defaults';

import { IPacket } from './packets/IPacket';
import { INSIM_VERSION, IS_ISI, IS_ISI_Data } from './packets/IS_ISI';
import { IS_VER } from './packets/IS_VER';
import { packetMap } from './packets/packetMap';
import { PacketType } from './packetTypes';
import { Tcp } from './Tcp';
import { unpack } from './utils/jspack';

type InSimOptions = IS_ISI_Data & {
  protocol: 'tcp' | 'udp';
  host: string;
  port: number;
};

const defaultInSimOptions: InSimOptions = {
  IName: '',
  InSimVer: INSIM_VERSION,
  ReqI: 0,
  protocol: 'tcp',
  host: '127.0.0.1',
  port: 29999,
  UDPPort: 0,
  Admin: '',
  Prefix: '!',
  Flags: 0,
  Interval: 0,
};

export class InSim extends EventEmitter {
  private readonly options: InSimOptions = defaultInSimOptions;
  private connection: Tcp;

  // TODO: Move passing options to connect()
  constructor(options?: Partial<InSimOptions>) {
    super();

    this.options = defaults(options, defaultInSimOptions);
    console.log('InSim options:', this.options);

    this.connection = new Tcp(this.options.host, this.options.port);

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
      console.log('Insim packet received:', packetTypeString, data);
      const packetClass = packetMap[packetType] as typeof IS_VER;

      this.emit(packetTypeString, new packetClass().unpack(data));
    });
  }

  connect() {
    this.connection.connect();
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
