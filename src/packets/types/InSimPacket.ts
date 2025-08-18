import type { packetTypeToClass } from '../index';

export type InSimPacket =
  (typeof packetTypeToClass)[keyof typeof packetTypeToClass];

export type InSimPacketClassInstance<
  TPacketType extends keyof typeof packetTypeToClass,
> = Omit<
  (typeof packetTypeToClass)[TPacketType]['prototype'],
  | 'getFormat'
  | 'getFormatSize'
  | 'getValidPropertyNames'
  | 'initialize'
  | 'parseArray'
  | 'parseObject'
  | 'pack'
  | 'unpack'
>;
