import { BufferWriter } from 'typed-binary';

import { InSimError } from '../../errors';
import type { Receivable, Sendable } from '../types';
import { Struct } from './Struct';

export abstract class SendableStruct
  extends Struct
  implements Receivable, Sendable
{
  pack(propertyFormatOverrides?: Record<string, string>) {
    const buffer = new Uint8Array();
    const writer = new BufferWriter(buffer);

    const values = this.schema.properties;
    this.schema.write(writer, values);

    return buffer;
  }
}
