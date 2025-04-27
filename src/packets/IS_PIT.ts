import { byte, unsigned, word } from '../decorators';
import { Packet } from './base';
import type { PlayerFlags } from './enums';
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

export enum PitWorkFlags {
  /** No work done */
  PSE_NOTHING = 1,

  /** Stopped at pit box */
  PSE_STOP = 2,

  /** Front damage */
  PSE_FR_DAM = 4,

  /** Front wheels change */
  PSE_FR_WHL = 8,

  /** Left front damage */
  PSE_LE_FR_DAM = 16,

  /** Left front wheel change */
  PSE_LE_FR_WHL = 32,

  /** Right front damage */
  PSE_RI_FR_DAM = 64,

  /** Right front wheel change */
  PSE_RI_FR_WHL = 128,

  /** Rear damage */
  PSE_RE_DAM = 256,

  /** Rear wheels change */
  PSE_RE_WHL = 512,

  /** Left rear damage */
  PSE_LE_RE_DAM = 1024,

  /** Left rear wheel change */
  PSE_LE_RE_WHL = 2048,

  /** Right rear damage */
  PSE_RI_RE_DAM = 4096,

  /** Right rear wheel change */
  PSE_RI_RE_WHL = 8192,

  /** Minor body damage */
  PSE_BODY_MINOR = 16384,

  /** Major body damage */
  PSE_BODY_MAJOR = 32768,

  /** Setup adjustments */
  PSE_SETUP = 65536,

  /** Refuel */
  PSE_REFUEL = 131072,
}
