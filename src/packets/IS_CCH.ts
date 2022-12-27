import { byte } from '../utils';
import { AbstractPacket } from './AbstractPacket';
import type { ViewIdentifier } from './enums';
import { PacketType } from './enums';

/**
 * Camera CHange
 */
export class IS_CCH extends AbstractPacket {
  @byte() readonly Size = 8;
  @byte() readonly Type = PacketType.ISP_CCH;
  @byte() readonly ReqI: 0 = 0;

  /** Player's unique id */
  @byte() PLID = 0;

  /** View identifier */
  @byte() Camera: ViewIdentifier = 0;

  @byte() Sp1: 0 = 0;
  @byte() Sp2: 0 = 0;
  @byte() Sp3: 0 = 0;
}
