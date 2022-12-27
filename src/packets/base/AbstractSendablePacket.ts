import { pack } from '../../utils';
import type { PacketType } from '../enums';
import { AbstractSendableStruct } from './AbstractSendableStruct';
import type { Packet } from './Packet';
import type { Receivable } from './Receivable';
import type { Sendable } from './Sendable';

export abstract class AbstractSendablePacket
  extends AbstractSendableStruct
  implements Packet, Receivable, Sendable
{
  abstract Size: number;
  abstract Type: PacketType;
  abstract ReqI: number;

  pack(propertyFormatOverrides?: Record<string, string>): Buffer {
    const propertyNames = this.getValidPropertyNames();
    const format = `<${this.getFormat(propertyFormatOverrides)}`;
    const values: unknown[] = [];

    propertyNames.forEach((propertyName) => {
      const propertyValue = this[propertyName as keyof this];

      if (propertyName === 'Size') {
        values.push(
          (propertyValue as unknown as number) /
            AbstractSendablePacket.SIZE_MULTIPLIER,
        );
        return;
      }

      // Spread all values of structs in packet properties
      if (propertyValue instanceof AbstractSendableStruct) {
        const struct = propertyValue as AbstractSendableStruct;

        const map = struct
          .getValidPropertyNames()
          .map(
            (structPropName) => struct[structPropName as keyof typeof struct],
          );

        values.push(...map);
        return;
      }

      return values.push(propertyValue);
    });

    return pack(format, values);
  }
}
