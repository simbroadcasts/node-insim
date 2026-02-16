import { Packet } from '../base/index.js';
import { byte } from '../decorators.js';
import { PacketType } from '../enums/index.js';

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

export enum FlagType {
  /** Blue flag given (car being lapped) */
  BLUE = 1,

  /** Yellow flag shown (car is slow or stopped in dangerous place */
  YELLOW = 2,
}
