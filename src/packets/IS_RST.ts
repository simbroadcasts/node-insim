import { byte, char, word } from '../utils';
import { BasePacket } from './BasePacket';
import { PacketType } from './enums';
import type { RaceFlags } from './enums/RaceFlags';

/**
 * Race STart
 */
export class IS_RST extends BasePacket {
  @byte() readonly Size = 28;
  @byte() readonly Type = PacketType.ISP_RST;
  @byte() ReqI = 0;
  @byte() readonly Zero: 0 = 0;

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
   * - 0xc0: no lap tim ding - e.g. open config with no user checkpoints
   *
   * Bits 0 and 1 (Timing & 0x03): number of checkpoints if lap timing is enabled
   */
  @byte() Timing = 0;

  /** Short track name */
  @char(6) Track = '';

  @byte() Weather = 0;
  @byte() Wind = 0;

  /** Race flags (must pit, can reset, etc.) */
  @word() Flags: RaceFlags = 0;

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
