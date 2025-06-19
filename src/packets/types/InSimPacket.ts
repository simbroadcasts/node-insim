import type { packetTypeToClass } from '../index';

export type InSimPacket =
  (typeof packetTypeToClass)[keyof typeof packetTypeToClass];

export type InSimPacketClassInstance<
  TPacketType extends keyof typeof packetTypeToClass,
> = (typeof packetTypeToClass)[TPacketType]['prototype'];
