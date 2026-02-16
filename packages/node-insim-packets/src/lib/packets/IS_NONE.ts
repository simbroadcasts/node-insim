import { Packet } from '../base/index.js';
import { PacketType } from '../enums/index.js';

export class IS_NONE extends Packet {
  readonly Size = 4;
  readonly Type = PacketType.ISP_NONE;
  readonly ReqI = 0;
}
