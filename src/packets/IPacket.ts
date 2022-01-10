import { PacketType } from './packetTypes';

export type IPacket = {
  readonly Size: number;
  readonly Type: PacketType;
  ReqI: number;
};
