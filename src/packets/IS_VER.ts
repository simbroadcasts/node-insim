import { PacketType } from '../packetTypes';
import { pack } from '../utils/jspack';
import { BasePacket } from './BasePacket';
import { INSIM_VER } from './IS_ISI';

export type IS_VER_Data = {
  ReqI: number;
  Version: string;
  Product: string;
  InSimVer: number;
  Spare: number;
};

export class IS_VER extends BasePacket<IS_VER_Data> implements IS_VER_Data {
  readonly _format = '<BBBB8s6sH';
  readonly Size = 20;
  readonly Type = PacketType.ISP_ISI;
  ReqI = 0;
  Zero = 0;
  Version = '0';
  Product = '';
  InSimVer = INSIM_VER;
  Spare: number;

  constructor(data?: Partial<IS_VER_Data>) {
    super();
    this.populateData(data);
  }

  pack(): string | Uint8Array {
    const values = [
      this.Size / 4,
      this.Type,
      this.ReqI,
      0,
      this.Version,
      this.Product,
      this.InSimVer,
      this.Spare,
    ];

    return pack(this._format, values);
  }
}
