import { Packet } from '../base/index.js';
import { byte, unsigned } from '../decorators.js';
import type { PenaltyValue } from '../enums/index.js';
import { PacketType } from '../enums/index.js';

/**
 * SPlit X time
 */
export class IS_SPX extends Packet {
  @byte() readonly Size = 16;
  @byte() readonly Type = PacketType.ISP_SPX;
  @byte() readonly ReqI = 0;

  /** Player's unique id */
  @byte() PLID = 0;

  /** Split time (ms) */
  @unsigned() STime = 0;

  /** Total time (ms) */
  @unsigned() ETime = 0;

  /** Split number 1, 2, 3 */
  @byte() Split = 0;

  /** Current penalty value */
  @byte() Penalty: PenaltyValue = 0;

  /** Number of pit stops */
  @byte() NumStops = 0;

  /** /showfuel yes: double fuel percent / no: 255 */
  @byte() Fuel200 = 0;
}
