import { byte, unsigned, word } from '../utils';
import { BasePacket } from './BasePacket';
import type {
  PenaltyValue,
  PitWorkFlags,
  PlayerFlags,
  TyreCompound,
} from './enums';
import { PacketType } from './enums';

/**
 * PIT stop (stop at pit garage)
 */
export class IS_PIT extends BasePacket {
  @byte() readonly Size = 24;
  @byte() readonly Type = PacketType.ISP_PIT;
  @byte() readonly ReqI: 0 = 0;

  /** Player's unique id */
  @byte() PLID = 0;

  /** Laps completed */
  @word() LapsDone = 0;

  /** Player flags */
  @word() Flags: PlayerFlags = 0;

  /** /showfuel yes: fuel added percent / no: 255 */
  @byte() FuelAdd = 0;

  /** Current penalty value */
  @byte() Penalty: PenaltyValue = 0;

  /** Number of pit stops */
  @byte() NumStops = 0;

  @byte() readonly Sp3: 0 = 0;

  /** Rear left tyre compound */
  @byte() TyreRL: TyreCompound = 0;

  /** Rear right tyre compound */
  @byte() TyreRR: TyreCompound = 0;

  /** Front left tyre compound */
  @byte() TyreFL: TyreCompound = 0;

  /** Front right tyre compound */
  @byte() TyreFR: TyreCompound = 0;

  /** Pit work */
  @unsigned() Work: PitWorkFlags = 0;

  @unsigned() readonly Spare: 0 = 0;
}
