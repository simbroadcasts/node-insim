import { byte, string, word } from '../utils';
import { Packet } from './base';
import type { RaceFlags, Wind } from './enums';
import { PacketType } from './enums';

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
  @string(6) Track = '';

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
