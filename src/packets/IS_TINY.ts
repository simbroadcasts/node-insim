import { byte } from '../decorators';
import { SendablePacket } from './base';
import { PacketType, TinyType } from './enums';

/**
 * General purpose 4 byte packet
 */
export class IS_TINY extends SendablePacket {
  @byte() readonly Size = 4;
  @byte() readonly Type = PacketType.ISP_TINY;

  /** 0 unless it is an info request or a reply to an info request */
  @byte() ReqI = 0;

  /** Subtype */
  @byte() SubT: TinyType = TinyType.TINY_NONE;

  constructor(data?: IS_TINY_Data) {
    super();
    this.initialize(data);
  }
}

export type IS_TINY_Data =
  | {
      /** Info request ID */
      ReqI: number;

      /** Info request subtype */
      SubT: InfoRequestTinyType;
    }
  | {
      ReqI?: never;

      /** Sendable subtype */
      SubT: Exclude<SendableTinyType, InfoRequestTinyType>;
    };

export const SENDABLE_TINY_TYPES = [
  TinyType.TINY_NONE,
  TinyType.TINY_VER,
  TinyType.TINY_CLOSE,
  TinyType.TINY_PING,
  TinyType.TINY_VTC,
  TinyType.TINY_SCP,
  TinyType.TINY_SST,
  TinyType.TINY_GTH,
  TinyType.TINY_ISM,
  TinyType.TINY_NCN,
  TinyType.TINY_NPL,
  TinyType.TINY_RES,
  TinyType.TINY_NLP,
  TinyType.TINY_MCI,
  TinyType.TINY_REO,
  TinyType.TINY_RST,
  TinyType.TINY_AXI,
  TinyType.TINY_RIP,
  TinyType.TINY_NCI,
  TinyType.TINY_ALC,
  TinyType.TINY_AXM,
  TinyType.TINY_SLC,
  TinyType.TINY_MAL,
  TinyType.TINY_PLH,
  TinyType.TINY_IPB,
] as const;

export const INFO_REQUEST_TINY_TYPES = [
  TinyType.TINY_VER,
  TinyType.TINY_PING,
  TinyType.TINY_SCP,
  TinyType.TINY_SST,
  TinyType.TINY_GTH,
  TinyType.TINY_ISM,
  TinyType.TINY_NCN,
  TinyType.TINY_NPL,
  TinyType.TINY_RES,
  TinyType.TINY_NLP,
  TinyType.TINY_MCI,
  TinyType.TINY_REO,
  TinyType.TINY_RST,
  TinyType.TINY_AXI,
  TinyType.TINY_RIP,
  TinyType.TINY_NCI,
  TinyType.TINY_ALC,
  TinyType.TINY_AXM,
  TinyType.TINY_SLC,
  TinyType.TINY_MAL,
  TinyType.TINY_PLH,
  TinyType.TINY_IPB,
] as const;

export type SendableTinyType = (typeof SENDABLE_TINY_TYPES)[number];

export type InfoRequestTinyType = (typeof INFO_REQUEST_TINY_TYPES)[number];
