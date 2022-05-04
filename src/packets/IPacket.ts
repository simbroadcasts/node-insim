import type { Byte } from '../types';
import type { PacketType } from './packetTypes';

export type IPacket = {
  readonly Size: Byte;
  readonly Type: PacketType;
  ReqI: Byte;
};
