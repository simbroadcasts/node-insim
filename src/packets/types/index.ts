import type { AbstractSendablePacket } from '../AbstractSendablePacket';
import type { IPacket } from '../IPacket';

type ReadonlyPropNames =
  | 'Zero'
  | 'Spare'
  | 'Spare1'
  | 'Spare2'
  | 'Spare3'
  | 'Sp1'
  | 'Sp2'
  | 'Sp3';

type ReadonlySendableProps = keyof AbstractSendablePacket | ReadonlyPropNames;

type ReadonlySendablePropsExceptReqI =
  | keyof Omit<AbstractSendablePacket, 'ReqI'>
  | ReadonlyPropNames;

type OmitReadonlyProps<T> = Omit<T, ReadonlySendableProps>;

type OmitReadonlyPropsExceptReqI<T> = Omit<T, ReadonlySendablePropsExceptReqI>;

type PacketDataWithReqI<T extends IPacket> = OmitReadonlyPropsExceptReqI<T>;

export type PacketData<T extends IPacket> = Partial<OmitReadonlyProps<T>>;

export type PacketDataWithRequiredReqI<T extends IPacket> = Partial<
  Omit<PacketDataWithReqI<T>, 'ReqI'>
> &
  Pick<T, 'ReqI'>;

export type PacketDataWithOptionalReqI<T extends IPacket> = Partial<
  PacketDataWithReqI<T>
>;
