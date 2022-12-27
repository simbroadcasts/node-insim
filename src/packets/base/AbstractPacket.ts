import type { PacketType } from '../enums';
import { AbstractStruct } from './AbstractStruct';
import type { Packet } from './Packet';
import type { Receivable } from './Receivable';

export abstract class AbstractPacket
  extends AbstractStruct
  implements Packet, Receivable
{
  abstract Size: number;
  abstract Type: PacketType;
  abstract ReqI: number;
}
