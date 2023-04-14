import { byte, string, stringNull, unsigned, word } from '../decorators';
import { Packet } from './base';
import type { ConfirmationFlags, PlayerFlags } from './enums';
import { PacketType } from './enums';

/**
 * RESult (qualify or confirmed finish)
 */
export class IS_RES extends Packet {
  @byte() readonly Size = 84;
  @byte() readonly Type = PacketType.ISP_RES;

  /** 0 unless this is a reply to a {@link TINY_RES} request */
  @byte() ReqI = 0;

  /** Player's unique id (0 = player left before result was sent) */
  @byte() PLID = 0;

  /** Username */
  @stringNull(24) UName = '';

  /** Nickname */
  @stringNull(24) PName = '';

  /** Number plate - NO ZERO AT END! */
  @string(8) Plate = '';

  /** Skin prefix */
  @stringNull(4) CName = '';

  /** Race or autocross: total time / qualify: session time (ms) */
  @unsigned() TTime = 0;

  /** Best lap (ms) */
  @unsigned() BTime = 0;

  @byte() readonly SpA = 0;

  /** Number of pit stops */
  @byte() NumStops = 0;

  /** confirmation flags: disqualified etc. */
  @byte() Confirm: ConfirmationFlags = 0;

  @byte() readonly SpB = 0;

  /** Laps completed */
  @word() LapsDone = 0;

  /** Player flags: help settings etc. */
  @word() Flags: PlayerFlags | 0 = 0;

  /** Finish or qualify pos (0 = win / 255 = not added to table) */
  @byte() ResultNum = 0;

  /** Total number of results (qualify doesn't always add a new one) */
  @byte() NumRes = 0;

  /** Penalty time in seconds (already included in race time) */
  @word() PSeconds = 0;
}
