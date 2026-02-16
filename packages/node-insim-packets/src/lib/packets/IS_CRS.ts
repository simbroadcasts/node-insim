import { Packet } from '../base/index.js';
import { byte } from '../decorators.js';
import { PacketType } from '../enums/index.js';

/**
 * Car ReSet
 */
export class IS_CRS extends Packet {
  @byte() readonly Size = 4;
  @byte() readonly Type = PacketType.ISP_CRS;
  @byte() readonly ReqI = 0;

  /** Player's unique id */
  @byte() PLID = 0;
}
