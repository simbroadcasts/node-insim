import { Packet } from '../base/index.js';
import { byte } from '../decorators.js';
import { PacketType } from '../enums/index.js';

/**
 * PLayer Pits (go to settings - stays in player list)
 */
export class IS_PLP extends Packet {
  @byte() readonly Size = 4;
  @byte() readonly Type = PacketType.ISP_PLP;
  @byte() readonly ReqI = 0;

  /** Player's unique id */
  @byte() PLID = 0;
}
