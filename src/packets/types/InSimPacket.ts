import type { packetTypeToClass } from '../index';

export type InSimPacket =
  (typeof packetTypeToClass)[keyof typeof packetTypeToClass];
