import { Byte } from '../types';
import { PacketType } from './packetTypes';

export type IPacket = {
  readonly Size: Byte;
  readonly Type: PacketType;
  ReqI: Byte;
};
