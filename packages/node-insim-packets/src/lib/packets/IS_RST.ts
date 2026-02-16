import { Packet } from '../base/index.js';
import { byte, stringNull, word } from '../decorators.js';
import type { Wind } from '../enums/index.js';
import { PacketType } from '../enums/index.js';

/**
 * Race STart
 */
export class IS_RST extends Packet {
  @byte() readonly Size = 28;
  @byte() readonly Type = PacketType.ISP_RST;

  /** 0 unless this is a reply to an {@link TINY_RST} request */
  @byte() ReqI = 0;

  @byte() readonly Zero = 0;

  /** 0 if qualifying */
  @byte() RaceLaps = 0;

  /** 0 if race */
  @byte() QualMins = 0;

  /** Number of players in race */
  @byte() NumP = 0;

  /**
   * Lap timing
   *
   * Bits 6 and 7 (Timing & 0xc0):
   *
   * - 0x40: standard lap timing is being used
   * - 0x80: custom timing - user checkpoints have been placed
   * - 0xc0: no lap timing - e.g. open config with no user checkpoints
   *
   * Bits 0 and 1 (Timing & 0x03): number of checkpoints if lap timing is enabled
   */
  @byte() Timing = 0;

  /** Short track name */
  @stringNull(6) Track = '';

  @byte() Weather = 0;
  @byte() Wind: Wind = 0;

  /** Race flags (must pit, can reset, etc.) */
  @word() Flags: RaceFlags | 0 = 0;

  /** Total number of nodes in the path */
  @word() NumNodes = 0;

  /** Node index - finish line */
  @word() Finish = 0;

  /** Node index - split 1 */
  @word() Split1 = 0;

  /** Node index - split 2 */
  @word() Split2 = 0;

  /** Node index - split 3 */
  @word() Split3 = 0;
}

export enum RaceFlags {
  /** Vote kick/ban allowed */
  HOSTF_CAN_VOTE = 1,

  /** Guest are allowed to select tracks */
  HOSTF_CAN_SELECT = 2,

  /** Mid-race join allowed */
  HOSTF_MID_RACE = 32,

  /** Pit stop required */
  HOSTF_MUST_PIT = 64,

  /** Car reset allowed */
  HOSTF_CAN_RESET = 128,

  /** Forced cockpit view */
  HOSTF_FCV = 256,

  /** Cruise mode (wrong way allowed) */
  HOSTF_CRUISE = 512,

  /** Remote cars fuel visible */
  HOSTF_SHOW_FUEL = 1024,

  /** Refuelling allowed */
  HOSTF_CAN_REFUEL = 2048,

  /** Allow vehicle mods */
  HOSTF_ALLOW_MODS = 4096,

  /** Allow unapproved mods */
  HOSTF_UNAPPROVED = 8192,

  /** Arrows on non-race small map use name colour */
  HOSTF_TEAMARROWS = 16384,

  /** Floodlights off */
  HOSTF_NO_FLOOD = 32768,
}
