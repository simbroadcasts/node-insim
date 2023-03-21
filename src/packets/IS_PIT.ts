import { byte, unsigned, word } from '../utils';
import { Packet } from './base';
import type { PitWorkFlags, PlayerFlags } from './enums';
import { PacketType, PenaltyValue, TyreCompound } from './enums';

/**
 * PIT stop (stop at pit garage)
 */
export class IS_PIT extends Packet {
  @byte() readonly Size = 24;
  @byte() readonly Type = PacketType.ISP_PIT;
  @byte() readonly ReqI = 0;

  /** Player's unique id */
  @byte() PLID = 0;

  /** Laps completed */
  @word() LapsDone = 0;

  /** Player flags */
  @word() Flags: PlayerFlags | 0 = 0;

  /** /showfuel yes: fuel added percent / no: 255 */
  @byte() FuelAdd = 0;

  /** Current penalty value */
  @byte() Penalty: PenaltyValue = PenaltyValue.PENALTY_NONE;

  /** Number of pit stops */
  @byte() NumStops = 0;

  @byte() private readonly Sp3 = 0;

  /** Rear left tyre compound */
  @byte() TyreRL: TyreCompound = TyreCompound.TYRE_R1;

  /** Rear right tyre compound */
  @byte() TyreRR: TyreCompound = TyreCompound.TYRE_R1;

  /** Front left tyre compound */
  @byte() TyreFL: TyreCompound = TyreCompound.TYRE_R1;

  /** Front right tyre compound */
  @byte() TyreFR: TyreCompound = TyreCompound.TYRE_R1;

  /** Pit work */
  @unsigned() Work: PitWorkFlags | 0 = 0;

  @unsigned() private readonly Spare = 0;
}
