import type { Packet } from '../base/Packet.js';
import type { SendablePacket } from '../base/SendablePacket.js';
import type { ReadonlyPropNames } from './StructData.js';

type ReadonlyProps = keyof SendablePacket | ReadonlyPropNames;

type ReadonlySendablePropsExceptReqI =
  | keyof Omit<SendablePacket, 'ReqI'>
  | ReadonlyPropNames;

type OmitReadonlyProps<T> = Omit<T, ReadonlyProps>;

type OmitReadonlyPropsExceptReqI<T> = Omit<T, ReadonlySendablePropsExceptReqI>;

type PacketDataWithReqI<T extends Packet> = OmitReadonlyPropsExceptReqI<T>;

export type PacketData<T extends Packet> = Partial<OmitReadonlyProps<T>>;

export type PacketDataWithRequiredReqI<T extends Packet> = Partial<
  Omit<PacketDataWithReqI<T>, 'ReqI'>
> &
  Pick<T, 'ReqI'>;

export type PacketDataWithOptionalReqI<T extends Packet> = Partial<
  PacketDataWithReqI<T>
>;
