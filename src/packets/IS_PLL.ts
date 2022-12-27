import { byte } from '../utils';
import { Packet } from './base';
import { PacketType } from './enums';

/**
 * PLayer Leave race (spectate - removed from player list)
 */
export class IS_PLL extends Packet {
  @byte() readonly Size = 4;
  @byte() readonly Type = PacketType.ISP_PLL;
  @byte() readonly ReqI = 0;

  /** Player's unique id */
  @byte() PLID = 0;
}
