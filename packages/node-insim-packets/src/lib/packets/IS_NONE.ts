import { Packet } from '../base/Packet.js';
import { PacketType } from '../enums/PacketType.js';

export class IS_NONE extends Packet {
  readonly Size = 4;
  readonly Type = PacketType.ISP_NONE;
  readonly ReqI = 0;
}
