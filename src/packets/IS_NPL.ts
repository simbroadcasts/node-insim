import { byte, string, word } from '../utils';
import { AbstractPacket } from './AbstractPacket';
import type {
  CarConfiguration,
  PassengerFlags,
  PlayerFlags,
  PlayerType,
  SetupFlags,
  TyreCompound,
} from './enums';
import { PacketType } from './enums';

/**
 * New PLayer joining race (if PLID already exists, then leaving pits)
 */
export class IS_NPL extends AbstractPacket {
  @byte() readonly Size = 76;
  @byte() readonly Type = PacketType.ISP_NPL;

  /** 0 unless this is a reply to a {@link TINY_NPL} */
  @byte() ReqI = 0;

  /** Player's newly assigned unique id */
  @byte() PLID = 0;

  /** Connection's unique id */
  @byte() UCID = 0;

  /** Bit 0: female / bit 1: AI / bit 2: remote */
  @byte() PType: PlayerType = 0;

  /** Player flags */
  @word() Flags: PlayerFlags = 0;

  /** Nickname */
  @string(24) PName = '';

  /** Skin name - MAX_CAR_TEX_NAME */
  @string(16) SName = '';

  /** Rear left tyre compound */
  @byte() TyreRL: TyreCompound = 0;

  /** Rear right tyre compound */
  @byte() TyreRR: TyreCompound = 0;

  /** Front left tyre compound */
  @byte() TyreFL: TyreCompound = 0;

  /** Front right tyre compound */
  @byte() TyreFR: TyreCompound = 0;

  /** Added mass (kg) */
  @byte() H_Mass = 0;

  /** Intake restriction */
  @byte() H_TRes = 0;

  /** Driver model */
  @byte() Model = 0;

  /** Passengers byte */
  @byte() Pass: PassengerFlags = 0;

  /** Low 4 bits: tyre width reduction (rear) */
  @byte() RWAdj = 0;

  /** Low 4 bits: tyre width reduction (front) */
  @byte() FWAdj = 0;

  @byte() readonly Sp2 = 0;

  @byte() readonly Sp3 = 0;

  /** Setup flags */
  @byte() SetF: SetupFlags = 0;

  /** Number in race - ZERO if this is a join request */
  @byte() NumP = 0;

  /**
   * Configuration
   *
   * - UF1 / LX4 / LX6: 0 = DEFAULT / 1 = OPEN ROOF
   * - GTR racing cars: 0 = DEFAULT / 1 = ALTERNATE
   * */
  @byte() Config: CarConfiguration = 0;

  /** /showfuel yes: fuel percent / no: 255 */
  @byte() Fuel = 0;
}
