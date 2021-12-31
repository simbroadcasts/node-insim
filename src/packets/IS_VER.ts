import { BasePacket } from './BasePacket';
import { PacketType } from './packetTypes';

export type IS_VER_Data = {
  ReqI: number;
  Version: string;
  Product: string;
  InSimVer: number;
  Spare: number;
};

export class IS_VER extends BasePacket implements IS_VER_Data {
  readonly _format = '<BBBB8s6sBB';
  readonly Size = 20;
  readonly Type = PacketType.ISP_VER;
  ReqI = 0;
  readonly Zero = 0;
  Version = '';
  Product = '';
  InSimVer = 0;
  readonly Spare = 0;

  constructor(data?: Partial<IS_VER_Data>) {
    super();
    this.populateData(data);
  }
}
