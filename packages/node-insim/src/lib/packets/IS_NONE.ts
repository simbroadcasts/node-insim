import { Packet } from './base';
import { PacketType } from './enums';

export class IS_NONE extends Packet {
  readonly Size = 4;
  readonly Type = PacketType.ISP_NONE;
  readonly ReqI = 0;
}
