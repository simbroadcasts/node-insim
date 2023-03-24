import { byte } from '../decorators';
import { Packet } from './base';
import { PacketType } from './enums';

/**
 * AutoX Object
 *
 * If an autocross object is hit (2 second time penalty) this packet is sent.
 */
export class IS_AXO extends Packet {
  @byte() readonly Size = 4;
  @byte() readonly Type = PacketType.ISP_AXO;
  @byte() readonly ReqI = 0;

  /** Player's unique id */
  @byte() PLID = 0;
}
