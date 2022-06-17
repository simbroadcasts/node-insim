import type { PacketType } from './enums';

export type IPacket = {
  readonly Size: number;
  readonly Type: PacketType;
  ReqI: number;
};
