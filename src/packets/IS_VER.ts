import { BasePacket } from './BasePacket';
import { INSIM_VERSION } from './IS_ISI';
import { PacketType } from './packetTypes';

export type IS_VER_Data = {
  ReqI: number;
  Version: string;
  Product: string;
  InSimVer: number;
  Spare: number;
};

export class IS_VER extends BasePacket implements IS_VER_Data {
  readonly _format = '<BBBB8s6sH';
  readonly Size = 20;
  readonly Type = PacketType.ISP_VER;
  ReqI = 0;
  Zero = 0;
  Version = '0';
  Product = '';
  InSimVer = INSIM_VERSION;
  Spare: number;

  constructor(data?: Partial<IS_VER_Data>) {
    super();
    this.populateData(data);
  }
}
