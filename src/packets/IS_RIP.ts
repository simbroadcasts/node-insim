import { byte, stringNull, unsigned } from '../decorators';
import { SendablePacket } from './base';
import { PacketType } from './enums';
import type { PacketDataWithRequiredReqI } from './types';

const RNAME_MAX_LENGTH = 64;

/**
 * Replay Information Packet
 *
 * You can load a replay or set the position in a replay with an IS_RIP packet. Replay positions and lengths are
 * specified in hundredths of a second. LFS will reply with another IS_RIP packet when the request is completed.
 *
 * You can request an IS_RIP packet at any time with this {@link IS_TINY}:
 *
 * - ReqI: non-zero          (returned in the reply)
 * - SubT: {@link TINY_RIP}  (Replay Information Packet)
 */
export class IS_RIP extends SendablePacket {
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
   * NOTE: {@link RIPOPT_FULL_PHYS} makes MPR searching much slower so should not normally be used. This flag was added
   * to allow high accuracy {@link IS_MCI} packets to be output when fast forwarding.
   * */
  @byte() Options: ReplayOptions | 0 = 0;

  @byte() private readonly Sp3 = 0;

  /** (hundredths) request: destination / reply: position */
  @unsigned() CTime = 0;

  /** (hundredths) request: zero / reply: replay length */
  @unsigned() TTime = 0;

  /** Zero or replay name - last byte must be zero */
  @stringNull(RNAME_MAX_LENGTH) RName = '';

  constructor(data?: IS_RIP_Data) {
    super();
    this.initialize(data);
  }

  pack() {
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

export enum ReplayError {
  /** OK: completed instruction */
  RIP_OK,

  /** OK: already at the destination */
  RIP_ALREADY,

  /** Can't run a replay - dedicated host */
  RIP_DEDICATED,

  /** Can't start a replay - not in a suitable mode */
  RIP_WRONG_MODE,

  /** RName is zero but no replay is currently loaded */
  RIP_NOT_REPLAY,

  /** {@link IS_RIP} corrupted (e.g. RName does not end with zero) */
  RIP_CORRUPTED,

  /** The replay file was not found */
  RIP_NOT_FOUND,

  /** Obsolete / future / corrupted */
  RIP_UNLOADABLE,

  /** Destination is beyond replay length */
  RIP_DEST_OOB,

  /** Unknown error found starting replay */
  RIP_UNKNOWN,

  /** Replay search was terminated by user */
  RIP_USER,

  /** Can't reach destination - SPR is out of sync */
  RIP_OOS,
}

export enum ReplayMode {
  /** Single player replay */
  SPR,

  /** Multiplayer replay */
  MPR,
}

export enum ReplayOptions {
  /** Replay will loop if this bit is set */
  RIPOPT_LOOP = 1,

  /** Set this bit to download missing skins */
  RIPOPT_SKINS = 2,

  /** Use full physics when searching an MPR */
  RIPOPT_FULL_PHYS = 4,
}
