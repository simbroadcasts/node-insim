import { PacketType } from '../packetTypes';
import { IS_VER } from './IS_VER';

export const packetMap: Partial<Record<PacketType, string>> = {
  [PacketType.ISP_VER]: IS_VER.name,
  // TODO handle all packets
  // [PacketType.ISP_TINY]:
};
