import type { BaseSendablePacket } from '../BaseSendablePacket';
import type { IPacket } from '../IPacket';

type ReadonlySendableProps = keyof BaseSendablePacket | 'Zero';

type ReadonlySendablePropsExceptReqI =
  | keyof Omit<BaseSendablePacket, 'ReqI'>
  | 'Zero';

type OmitReadonlyProps<T> = Omit<T, ReadonlySendableProps>;

type OmitReadonlyPropsExceptReqI<T> = Omit<T, ReadonlySendablePropsExceptReqI>;

export type PacketData<T extends IPacket> = Partial<OmitReadonlyProps<T>>;

type PacketDataWithReqI<T extends IPacket> = OmitReadonlyPropsExceptReqI<T>;

export type PacketDataWithRequiredReqI<T extends IPacket> = Partial<
  Omit<PacketDataWithReqI<T>, 'ReqI'>
> &
  Pick<T, 'ReqI'>;

export type PacketDataWithOptionalReqI<T extends IPacket> = Partial<
  PacketDataWithReqI<T>
>;
