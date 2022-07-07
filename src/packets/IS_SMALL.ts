import type { PartialExcept } from '../types';
import { byte, unsigned } from '../utils';
import { BaseSendablePacket } from './BaseSendablePacket';
import { PacketType, SmallType } from './enums';

/**
 * General purpose 8 byte packet
 */
export class IS_SMALL extends BaseSendablePacket {
  @byte() readonly Size = 8;
  @byte() readonly Type = PacketType.ISP_SMALL;

  /** 0 unless it is an info request or a reply to an info request */
  @byte() ReqI = 0;

  /** Subtype */
  @byte() SubT: SmallType = SmallType.SMALL_NONE;

  /** Value (e.g. for {@link SMALL_SSP} this would be the OutSim packet rate) */
  @unsigned() UVal = 0;

  constructor(data?: IS_SMALL_Data | Buffer) {
    super();
    this.initialize(data);
  }
}

export type IS_SMALL_Data = PartialExcept<
  Pick<IS_SMALL, 'ReqI' | 'SubT' | 'UVal'>,
  'SubT' | 'UVal'
>;

export const SENDABLE_SMALL_TYPES = [
  SmallType.SMALL_SSP,
  SmallType.SMALL_SSG,
  SmallType.SMALL_TMS,
  SmallType.SMALL_STP,
  SmallType.SMALL_NLI,
  SmallType.SMALL_ALC,
  SmallType.SMALL_LCS,
] as const;

export type SendableSmallType = typeof SENDABLE_SMALL_TYPES[number];
