import { PacketType } from '../packetTypes';
import { pack } from '../utils/jspack';
import { BasePacket } from './BasePacket';

export enum IS_ISI_ReqI {
  REQI_ZERO,
  REQI_SEND_VERSION,
}

export type IS_ISI_Data = {
  ReqI: IS_ISI_ReqI;
  UDPPort: number;
  Flags: InSimFlags;
  InSimVer: number;
  Prefix: string;
  Interval: number;
  Admin: string;
  IName: string;
};

export const INSIM_VER = 9;

export class IS_ISI extends BasePacket<IS_ISI_Data> implements IS_ISI_Data {
  readonly _format = '<BBBxHHBBH16s16s';
  readonly Size = 44;
  readonly Type = PacketType.ISP_ISI;
  ReqI = 0;
  UDPPort = 0;
  Flags: InSimFlags = 0;
  Admin = '';
  IName = '';
  InSimVer = INSIM_VER;
  Interval = 0;
  Prefix = '!';

  constructor(data?: Partial<IS_ISI_Data>) {
    super();
    this.populateData(data);
  }

  pack(): string | Uint8Array {
    const values = [
      this.Size / 4,
      this.Type,
      this.ReqI,
      0,
      this.UDPPort,
      this.Flags,
      this.InSimVer,
      this.Prefix,
      this.Interval,
      this.Admin,
      this.IName,
    ];

    return pack(this._format, values);
  }
}

export enum InSimFlags {
  ISF_RES_0 = 1, // bit  0: spare
  ISF_RES_1 = 2, // bit  1: spare
  ISF_LOCAL = 4, // bit  2: guest or single player
  ISF_MSO_COLS = 8, // bit  3: keep colours in MSO text
  ISF_NLP = 16, // bit  4: receive NLP packets
  ISF_MCI = 32, // bit  5: receive MCI packets
  ISF_CON = 64, // bit  6: receive CON packets
  ISF_OBH = 128, // bit  7: receive OBH packets
  ISF_HLV = 256, // bit  8: receive HLV packets
  ISF_AXM_LOAD = 512, // bit  9: receive AXM when loading a layout
  ISF_AXM_EDIT = 1024, // bit 10: receive AXM when changing objects
  ISF_REQ_JOIN = 2048, // bit 11: process join requests
}
