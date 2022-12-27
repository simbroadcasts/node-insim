import { byte, float, string, word } from '../utils';
import { AbstractPacket } from './base';
import type {
  RaceState,
  ServerStatus,
  StateFlags,
  ViewIdentifier,
  Wind,
} from './enums';
import { PacketType } from './enums';

/**
 * STAte
 *
 * LFS will send an {@link IS_STA} any time the info in it changes.
 *
 * To request an IS_STA at any time, send an {@link IS_TINY}
 * with {@link IS_TINY.SubT} of {@link TinyType.TINY_SST}.
 */
export class IS_STA extends AbstractPacket {
  @byte() readonly Size = 28;
  @byte() readonly Type = PacketType.ISP_STA;

  /** ReqI if replying to a request packet */
  @byte() ReqI = 0;

  @byte() readonly Zero = 0;

  /** 4-byte float - 1.0 is normal speed */
  @float() ReplaySpeed = 0;

  /** ISS state flags */
  @word() Flags: StateFlags = 0;

  /** Which type of camera is selected (which is still selected
   * even if LFS is actually in SHIFT+U mode) */
  @byte() InGameCam: ViewIdentifier = 0;

  /** Unique ID of viewed player (0 = none) */
  @byte() ViewPLID = 0;

  /** Number of players in race */
  @byte() NumP = 0;

  /** Number of connections including host */
  @byte() NumConns = 0;

  /** Number finished or qualified */
  @byte() NumFinished = 0;

  /** 0 = no race / 1 = race / 2 = qualifying */
  @byte() RaceInProg: RaceState = 0;

  /** Qualifying length in minutes */
  @byte() QualMins = 0;

  /**
   * RaceLaps (rl): (various meanings depending on range)
   *
   * 0       : practice
   * 1-99    : number of laps...   laps  = rl
   * 100-190 : 100 to 1000 laps... laps  = (rl - 100) * 10 + 100
   * 191-238 : 1 to 48 hours...    hours = rl - 190
   */
  @byte() RaceLaps = 0;

  @byte() private readonly Sp2 = 0;

  /** 0 = unknown / 1 = success / > 1 = fail */
  @byte() ServerStatus: ServerStatus | number = 0;

  /** Short name for track e.g. FE2R */
  @string(6) Track = '';

  @byte() Weather = 0;

  /** 0 = off / 1 = weak / 2 = strong */
  @byte() Wind: Wind = 0;
}
