import { byte, unsigned, word } from '../decorators';
import { Packet } from './base';
import type { PenaltyValue, PlayerFlags } from './enums';
import { PacketType } from './enums';

/**
 * LAP time
 */
export class IS_LAP extends Packet {
  @byte() readonly Size = 20;
  @byte() readonly Type = PacketType.ISP_LAP;
  @byte() readonly ReqI = 0;

  /** Player's unique id */
  @byte() PLID = 0;

  /** Lap time (ms) */
  @unsigned() LTime = 0;

  /** Total time (ms) */
  @unsigned() ETime = 0;

  /** Laps completed */
  @word() LapsDone = 0;

  /** Player flags */
  @word() Flags: PlayerFlags | 0 = 0;

  @byte() private readonly Sp0 = 0;

  /** Current penalty value */
  @byte() Penalty: PenaltyValue = 0;

  /** Number of pit stops */
  @byte() NumStops = 0;

  /** /showfuel yes: double fuel percent / no: 255 */
  @byte() Fuel200 = 0;
}
