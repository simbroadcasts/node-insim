import type { SendableStruct } from '../base/SendableStruct.js';
import type { Struct } from '../base/Struct.js';

export type ReadonlyPropNames =
  | 'Zero'
  | 'Spare'
  | 'Spare1'
  | 'Spare2'
  | 'Spare3'
  | 'Sp0'
  | 'Sp1'
  | 'Sp2'
  | 'Sp3'
  | 'SpF0'
  | 'SpF1'
  | 'SPU1'
  | 'SPU2'
  | 'SPU3'
  | 'SpW';

type ReadonlyStructProps = keyof SendableStruct | ReadonlyPropNames;

type OmitReadonlyStructProps<T> = Omit<T, ReadonlyStructProps>;

export type StructData<T extends Struct> = Partial<OmitReadonlyStructProps<T>>;
