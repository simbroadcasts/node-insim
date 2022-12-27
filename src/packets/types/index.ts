import type { AbstractSendablePacket, Packet } from '../base';
import type { Receivable, Sendable } from '../base';
import type { AbstractSendableStruct, AbstractStruct } from '../base';

type ReadonlyStructProps = keyof AbstractSendableStruct | ReadonlyPropNames;

type OmitReadonlyStructProps<T> = Omit<T, ReadonlyStructProps>;

export type StructData<T extends AbstractStruct> = Partial<
  OmitReadonlyStructProps<T>
>;

export type InfoPacket = Packet & Receivable;

export type InstructionPacket = Packet & Sendable;

export type BothWaysPacket = Packet & Sendable & Receivable;

type ReadonlyPropNames =
  | 'Zero'
  | 'Spare'
  | 'Spare1'
  | 'Spare2'
  | 'Spare3'
  | 'Sp0'
  | 'Sp1'
  | 'Sp2'
  | 'Sp3';

type ReadonlyProps = keyof AbstractSendablePacket | ReadonlyPropNames;

type ReadonlySendablePropsExceptReqI =
  | keyof Omit<AbstractSendablePacket, 'ReqI'>
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
