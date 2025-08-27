import type { RawProperties } from '../base/Struct';
import type { packetTypeToClass } from '../index';
import type { ReadonlyPropNames } from './StructData';

type InSimPacketByType<T extends keyof typeof packetTypeToClass> =
  (typeof packetTypeToClass)[T];

export type InSimPacket = InSimPacketByType<keyof typeof packetTypeToClass>;

export type InSimPacketInstance<
  TPacketType extends keyof typeof packetTypeToClass,
> = Omit<
  RawProperties<InSimPacketByType<TPacketType>['prototype']>,
  ReadonlyPropNames | 'Size' | 'Type'
> &
  Pick<InSimPacketByType<TPacketType>['prototype'], '_raw'>;
