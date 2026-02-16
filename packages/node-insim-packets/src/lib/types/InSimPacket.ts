import type { RawProperties } from '../base/Struct.js';
import type { packetTypeToClass } from '../packetTypeToClass.js';
import type { ReadonlyPropNames } from './StructData.js';

type InSimPacketByType<T extends keyof typeof packetTypeToClass> =
  (typeof packetTypeToClass)[T];

export type InSimPacket = InSimPacketByType<keyof typeof packetTypeToClass>;

export type InSimPacketInstance<
  TPacketType extends keyof typeof packetTypeToClass,
> = Omit<
  RawProperties<InSimPacketByType<TPacketType>['prototype']>,
  ReadonlyPropNames
> &
  Pick<InSimPacketByType<TPacketType>['prototype'], '_raw'>;
