import { pack } from '../../utils';
import { AbstractStruct } from './AbstractStruct';
import type { Receivable } from './Receivable';
import type { Sendable } from './Sendable';

export abstract class AbstractSendableStruct
  extends AbstractStruct
  implements Receivable, Sendable
{
  pack(propertyFormatOverrides?: Record<string, string>): Buffer {
    const propertyNames = this.getValidPropertyNames();

    const values = propertyNames.map(
      (propertyName) =>
        this[propertyName as unknown as Extract<keyof this, string>],
    );

    return pack(this.getFormat(propertyFormatOverrides), values);
  }
}
