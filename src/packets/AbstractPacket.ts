import { AbstractStruct } from './AbstractStruct';
import type { PacketType } from './enums';
import type { IPacket } from './IPacket';

export abstract class AbstractPacket extends AbstractStruct implements IPacket {
  abstract Size: number;
  abstract Type: PacketType;
  abstract ReqI: number;
}
