import { byte } from '../decorators';
import { Packet } from './base';
import { FlagType, PacketType } from './enums';

/**
 * FLaG (yellow or blue flag changed)
 */
export class IS_FLG extends Packet {
  @byte() readonly Size = 8;
  @byte() readonly Type = PacketType.ISP_FLG;
  @byte() readonly ReqI = 0;

  /** Player's unique id */
  @byte() PLID = 0;

  /** 0 = off / 1 = on */
  @byte() OffOn: 0 | 1 = 0;

  /** 1 = given blue / 2 = causing yellow */
  @byte() Flag: FlagType = FlagType.YELLOW;

  /** Unique id of obstructed player */
  @byte() CarBehind = 0;

  @byte() private readonly Sp3 = 0;
}
