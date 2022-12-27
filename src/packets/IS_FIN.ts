import { byte, unsigned, word } from '../utils';
import { Packet } from './base';
import type { ConfirmationFlags, PlayerFlags } from './enums';
import { PacketType } from './enums';

/**
 * FINished race notification (not a final result - use {@link IS_RES})
 */
export class IS_FIN extends Packet {
  @byte() readonly Size = 20;
  @byte() readonly Type = PacketType.ISP_FIN;
  @byte() readonly ReqI = 0;

  /** Player's unique id (0 = player left before result was sent) */
  @byte() PLID = 0;

  /** Race time (ms) */
  @unsigned() TTime = 0;

  /** Best lap (ms) */
  @unsigned() BTime = 0;

  @byte() readonly SpA = 0;

  /** Number of pit stops */
  @byte() NumStops = 0;

  /** Confirmation flags: disqualified etc. */
  @byte() Confirm: ConfirmationFlags = 0;

  @byte() readonly SpB = 0;

  /** Laps completed */
  @word() LapsDone = 0;

  /** Player flags: help settings etc. */
  @word() Flags: PlayerFlags = 0;
}
