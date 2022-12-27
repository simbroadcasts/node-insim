import type { PacketType } from './enums';
import type { IReceivable } from './IReceivable';

export type IPacket = IReceivable & {
  readonly Size: number;
  readonly Type: PacketType;
  ReqI: number;
};
