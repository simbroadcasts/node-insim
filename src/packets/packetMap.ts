import { PacketType } from '../packetTypes';
import { BasePacket } from './BasePacket';
import { IS_ISI } from './IS_ISI';
import { IS_VER } from './IS_VER';

// TODO handle all packets
export const packetMap: Partial<Record<PacketType, typeof BasePacket>> = {
  [PacketType.ISP_VER]: IS_VER,
  [PacketType.ISP_ISI]: IS_ISI,
};
