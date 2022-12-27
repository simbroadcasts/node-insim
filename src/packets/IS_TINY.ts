import { byte, log as baseLog } from '../utils';
import { BaseSendablePacket } from './BaseSendablePacket';
import { PacketType, TinyType } from './enums';

const logError = baseLog.extend('IS_TINY:error');

/**
 * General purpose 4 byte packet
 */
export class IS_TINY extends BaseSendablePacket {
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

  pack(): Buffer {
    if (
      this.ReqI === 0 &&
      INFO_REQUEST_TINY_TYPES.includes(this.SubT as InfoRequestTinyType)
    ) {
      logError(`${TinyType[this.SubT]} - ReqI must be greater than 0`);
    }

    return super.pack();
  }
}

export type IS_TINY_Data =
  | {
      /** 0 unless it is an info request or a reply to an info request */
      ReqI: number;

      /** Subtype */
      SubT: InfoRequestTinyType;
    }
  | {
      /** 0 unless it is an info request or a reply to an info request */
      ReqI?: number;

      /** Subtype */
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
  TinyType.TINY_NCI,
  TinyType.TINY_ALC,
  TinyType.TINY_AXM,
  TinyType.TINY_SLC,
  TinyType.TINY_MAL,
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
  TinyType.TINY_NCI,
  TinyType.TINY_ALC,
  TinyType.TINY_AXM,
  TinyType.TINY_SLC,
  TinyType.TINY_MAL,
] as const;

export type SendableTinyType = typeof SENDABLE_TINY_TYPES[number];

export type InfoRequestTinyType = typeof INFO_REQUEST_TINY_TYPES[number];
