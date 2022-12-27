import { byte, int } from '../utils';
import { BaseSendablePacket } from './BaseSendablePacket';
import { PacketType } from './enums';
import type { PacketData } from './types';

/**
 * MODe: send to LFS to change screen mode
 */
export class IS_MOD extends BaseSendablePacket {
  @byte() readonly Size = 20;
  @byte() readonly Type = PacketType.ISP_MOD;
  @byte() readonly ReqI: 0 = 0;
  @byte() readonly Zero: 0 = 0;

  /** Set to choose 16-bit */
  @int() Bits16 = 0;

  /**
   * Refresh rate - zero for default
   *
   * The refresh rate actually selected by LFS will be the highest available rate
   * that is less than or equal to the specified refresh rate. Refresh rate can
   * be specified as zero in which case the default refresh rate will be used.
   */
  @int() RR = 0;

  /** 0 means go to window */
  @int() Width = 0;

  /** 0 means go to window */
  @int() Height = 0;

  constructor(data?: IS_MOD_Data) {
    super();
    this.initialize(data);
  }
}

export type IS_MOD_Data = PacketData<IS_MOD>;
