import { InSimError } from '../errors.js';
import { pack } from '../lfspack.js';
import type { Receivable } from '../types/Receivable.js';
import type { Sendable } from '../types/Sendable.js';
import { Struct } from './Struct.js';

export abstract class SendableStruct
  extends Struct
  implements Receivable, Sendable
{
  pack(propertyFormatOverrides?: Record<string, string>) {
    const propertyNames = this.getValidPropertyNames();

    const values = propertyNames.map(
      (propertyName) =>
        this[propertyName as unknown as Extract<keyof this, string>],
    );

    const format = `<${this.getFormat(propertyFormatOverrides)}`;

    const packedData = pack(format, values);

    if (!packedData) {
      throw new InSimError('Could not pack values into a packet');
    }

    return packedData;
  }
}
