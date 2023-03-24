import { byte } from '../decorators';
import { Packet } from './base';
import { PacketType } from './enums';

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
