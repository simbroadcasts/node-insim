import type { AnyObjectSchema } from 'typed-binary';

import type { PacketType } from '../enums';
import type { Receivable } from '../types';
import { Struct } from './Struct';

export abstract class Packet<TSchema extends AnyObjectSchema = AnyObjectSchema>
  extends Struct<TSchema>
  implements Receivable
{
  abstract Size: number;
  abstract Type: PacketType;
  abstract ReqI: number;
}
