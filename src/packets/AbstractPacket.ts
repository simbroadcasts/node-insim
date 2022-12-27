import { AbstractStruct } from './AbstractStruct';
import type { PacketType } from './enums';
import type { IPacket } from './IPacket';
import type { IReceivable } from './IReceivable';

export abstract class AbstractPacket
  extends AbstractStruct
  implements IPacket, IReceivable
{
  abstract Size: number;
  abstract Type: PacketType;
  abstract ReqI: number;
}
