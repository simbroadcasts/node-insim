import { byte, unsigned } from '../utils';
import { AbstractPacket } from './base';
import type { PenaltyValue } from './enums';
import { PacketType } from './enums';

/**
 * SPlit X time
 */
export class IS_SPX extends AbstractPacket {
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
