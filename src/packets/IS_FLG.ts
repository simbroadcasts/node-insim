import { byte } from '../utils';
import { AbstractPacket } from './AbstractPacket';
import { PacketType } from './enums';

/**
 * FLaG (yellow or blue flag changed)
 */
export class IS_FLG extends AbstractPacket {
  @byte() readonly Size = 8;
  @byte() readonly Type = PacketType.ISP_FLG;
  @byte() readonly ReqI: 0 = 0;

  /** Player's unique id */
  @byte() PLID = 0;

  /** 0 = off / 1 = on */
  @byte() OffOn: 0 | 1 = 0;

  /** 1 = given blue / 2 = causing yellow */
  @byte() Flag = 0;

  /** Unique id of obstructed player */
  @byte() CarBehind = 0;

  @byte() readonly Sp3: 0 = 0;
}
