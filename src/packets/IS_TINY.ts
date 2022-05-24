import { createLog } from '../utils';
import { BaseSendablePacket } from './BaseSendablePacket';
import { byte } from './decorators';
import { PacketType } from './packetTypes';

const log = createLog('IS_TINY');

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

  constructor(data?: IS_TINY_Data | Buffer) {
    super();
    this.initialize(data);
  }

  pack(): Buffer {
    if (
      this.ReqI === 0 &&
      INFO_REQUEST_TINY_TYPES.includes(this.SubT as InfoRequestTinyType)
    ) {
      log.error(`${TinyType[this.SubT]} - ReqI must be greater than 0`);
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

export enum TinyType {
  /** Keep alive - maintain connection */
  TINY_NONE,

  /** Info request: get version */
  TINY_VER,

  /** Instruction: close insim */
  TINY_CLOSE,

  /** Ping request: external program requesting a reply */
  TINY_PING,

  /** Ping reply: reply to a ping request */
  TINY_REPLY,

  /** Both ways: game vote cancel (info or request) */
  TINY_VTC,

  /** Info request: send camera position */
  TINY_SCP,

  /** Info request: send state info */
  TINY_SST,

  /** Info request: get time in hundredths (i.e. {@link SMALL_RTP}) */
  TINY_GTH,

  /** Info: multi player end */
  TINY_MPE,

  /** Info request: get multiplayer info (i.e. {@link IS_ISM}) */
  TINY_ISM,

  /** Info: race end (return to race setup screen) */
  TINY_REN,

  /** Info: all players cleared from race */
  TINY_CLR,

  /** Info request: get {@link IS_NCN} for all connections */
  TINY_NCN,

  /** Info request: get all players */
  TINY_NPL,

  /** Info request: get all results */
  TINY_RES,

  /** Info request: send an {@link IS_NLP} */
  TINY_NLP,

  /** Info request: send an {@link IS_MCI} */
  TINY_MCI,

  /** Info request: send an {@link IS_REO} */
  TINY_REO,

  /** Info request: send an {@link IS_RST} */
  TINY_RST,

  /** Info request: send an {@link IS_AXI} - AutoX Info */
  TINY_AXI,

  /** Info: autocross cleared */
  TINY_AXC,

  /** Info request: send an {@link IS_RIP} - Replay Information Packet */
  TINY_RIP,

  /** Info request: get {@link IS_NCI} for all guests (on host only) */
  TINY_NCI,

  /** Info request: send a {@link SMALL_ALC} (allowed cars) */
  TINY_ALC,

  /** Info request: send {@link IS_AXM} packets for the entire layout */
  TINY_AXM,

  /** Info request: send {@link IS_SLC} packets for all connections */
  TINY_SLC,

  /** Info request: send {@link IS_MAL} listing the currently allowed mods */
  TINY_MAL,
}

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
