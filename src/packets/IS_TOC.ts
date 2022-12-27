import { byte } from '../utils';
import { BasePacket } from './BasePacket';
import { PacketType } from './enums';

/**
 * Take Over Car
 */
export class IS_TOC extends BasePacket {
  @byte() readonly Size = 8;
  @byte() readonly Type = PacketType.ISP_TOC;
  @byte() readonly ReqI: 0 = 0;

  /** Player's unique id */
  @byte() PLID = 0;

  /** Old connection's unique id */
  @byte() OldUCID = 0;

  /** New connection's unique id */
  @byte() NewUCID = 0;

  @byte() readonly Sp2: 0 = 0;
  @byte() readonly Sp3: 0 = 0;
}
