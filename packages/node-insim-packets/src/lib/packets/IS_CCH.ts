import { Packet } from '../base/index.js';
import { byte } from '../decorators.js';
import type { ViewIdentifier } from '../enums/index.js';
import { PacketType } from '../enums/index.js';

/**
 * Camera CHange
 */
export class IS_CCH extends Packet {
  @byte() readonly Size = 8;
  @byte() readonly Type = PacketType.ISP_CCH;
  @byte() readonly ReqI = 0;

  /** Player's unique id */
  @byte() PLID = 0;

  /** View identifier */
  @byte() Camera: ViewIdentifier = 0;

  @byte() private readonly Sp1 = 0;
  @byte() private readonly Sp2 = 0;
  @byte() private readonly Sp3 = 0;
}
