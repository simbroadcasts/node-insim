import type { PacketType } from '../enums';

export type Packet = {
  readonly Size: number;
  readonly Type: PacketType;
  ReqI: number;
};
