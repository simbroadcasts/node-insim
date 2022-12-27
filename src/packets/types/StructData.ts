import type { SendableStruct, Struct } from '../base';

export type ReadonlyPropNames =
  | 'Zero'
  | 'Spare'
  | 'Spare1'
  | 'Spare2'
  | 'Spare3'
  | 'Sp0'
  | 'Sp1'
  | 'Sp2'
  | 'Sp3';

type ReadonlyStructProps = keyof SendableStruct | ReadonlyPropNames;

type OmitReadonlyStructProps<T> = Omit<T, ReadonlyStructProps>;

export type StructData<T extends Struct> = Partial<OmitReadonlyStructProps<T>>;
