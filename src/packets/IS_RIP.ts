import { byte, string, unsigned } from '../utils';
import { AbstractSendablePacket } from './AbstractSendablePacket';
import type { ReplayError, ReplayMode, ReplayOptions } from './enums';
import { PacketType } from './enums';
import type { PacketDataWithRequiredReqI } from './types';

/**
 * Replay Information Packet
 *
 * You can load a replay or set the position in a replay with an IS_RIP packet. Replay positions and lengths are specified in hundredths of a second. LFS will reply with another IS_RIP packet when the request is completed.
 *
 * You can request an IS_RIP packet at any time with this {@link IS_TINY}:
 *
 * - ReqI: non-zero          (returned in the reply)
 * - SubT: {@link TINY_RIP}  (Replay Information Packet)
 */
export class IS_RIP extends AbstractSendablePacket {
  @byte() readonly Size = 80;
  @byte() readonly Type = PacketType.ISP_RIP;

  /** Request: non-zero / reply: same value returned */
  @byte() ReqI = 0;

  /** 0 or 1 = OK / for other values see {@link ReplayError} */
  @byte() Error: ReplayError = 0;

  /** 0 = SPR / 1 = MPR */
  @byte() MPR: ReplayMode = 0;

  /** Request: pause on arrival / reply: paused state */
  @byte() Paused = 0;

  /**
   * Various options.
   *
   * NOTE: {@link RIPOPT_FULL_PHYS} makes MPR searching much slower so should not normally be used. This flag was added to allow high accuracy {@link IS_MCI} packets to be output when fast forwarding.
   * */
  @byte() Options: ReplayOptions = 0;

  @byte() readonly Sp3 = 0;

  /** (hundredths) request: destination / reply: position */
  @unsigned() CTime = 0;

  /** (hundredths) request: zero / reply: replay length */
  @unsigned() TTime = 0;

  /** Zero or replay name - last byte must be zero */
  @string(64) RName = '';

  constructor(data?: IS_RIP_Data) {
    super();
    this.initialize(data);
  }

  pack(): Buffer {
    if (this.ReqI === 0) {
      throw new RangeError('IS_RIP - ReqI must be greater than 0');
    }

    return super.pack();
  }
}

export type IS_RIP_Data = Omit<
  PacketDataWithRequiredReqI<IS_RIP>,
  'Error' | 'TTime'
>;
