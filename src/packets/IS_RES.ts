import { byte, char, unsigned, word } from '../utils';
import { BasePacket } from './BasePacket';
import type { ConfirmationFlags, PlayerFlags } from './enums';
import { PacketType } from './enums';

/**
 * RESult (qualify or confirmed finish)
 */
export class IS_RES extends BasePacket {
  @byte() readonly Size = 84;
  @byte() readonly Type = PacketType.ISP_RES;
  @byte() ReqI = 0;

  /** Player's unique id (0 = player left before result was sent) */
  @byte() PLID = 0;

  /** Username */
  @char(24) UName = '';

  /** Nickname */
  @char(24) PName = '';

  /** Number plate - NO ZERO AT END! */
  @char(8) Plate = '';

  /** Skin prefix */
  @char(4) CName = '';

  /** Race or autocross: total time / qualify: session time (ms) */
  @unsigned() TTime = 0;

  /** Best lap (ms) */
  @unsigned() BTime = 0;

  @byte() readonly SpA: 0 = 0;

  /** Number of pit stops */
  @byte() NumStops = 0;

  /** confirmation flags: disqualified etc. */
  @byte() Confirm: ConfirmationFlags = 0;

  @byte() readonly SpB: 0 = 0;

  /** Laps completed */
  @word() LapsDone = 0;

  /** Player flags: help settings etc. */
  @word() Flags: PlayerFlags = 0;

  /** Finish or qualify pos (0 = win / 255 = not added to table) */
  @byte() ResultNum = 0;

  /** Total number of results (qualify doesn't always add a new one) */
  @byte() NumRes = 0;

  /** penalty time in seconds (already included in race time) */
  @word() PSeconds = 0;
}
