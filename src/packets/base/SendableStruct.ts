import { InSimError } from '../../errors';
import { pack } from '../../lfspack';
import type { Receivable, Sendable } from '../types';
import { Struct } from './Struct';

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
