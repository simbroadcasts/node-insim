import type { BaseSendablePacket } from '../BaseSendablePacket';
import type { IPacket } from '../IPacket';

export type PacketData<T extends IPacket> = Partial<
  Omit<T, keyof BaseSendablePacket | 'Zero'>
>;

type PacketDataWithReqI<T extends IPacket> = Omit<
  T,
  keyof Omit<BaseSendablePacket, 'ReqI'> | 'Zero'
>;

export type PacketDataWithRequiredReqI<T extends IPacket> = Partial<
  Omit<PacketDataWithReqI<T>, 'ReqI'>
> &
  Pick<T, 'ReqI'>;

export type PacketDataWithOptionalReqI<T extends IPacket> = Partial<
  PacketDataWithReqI<T>
>;
