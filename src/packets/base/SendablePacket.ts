import { InSimError } from '../../errors';
import { pack } from '../../utils';
import type { PacketType } from '../enums';
import type { Receivable, Sendable } from '../types';
import { Packet } from './Packet';
import { SendableStruct } from './SendableStruct';

export abstract class SendablePacket
  extends Packet
  implements Receivable, Sendable
{
  abstract Size: number;
  abstract Type: PacketType;
  abstract ReqI: number;

  pack(propertyFormatOverrides?: Record<string, string>) {
    const propertyNames = this.getValidPropertyNames();
    const format = `<${this.getFormat(propertyFormatOverrides)}`;
    const values: unknown[] = [];

    propertyNames.forEach((propertyName) => {
      const propertyValue = this[propertyName as keyof this];

      if (propertyName === 'Size') {
        values.push(
          (propertyValue as unknown as number) / this.SIZE_MULTIPLIER,
        );
        return;
      }

      // Spread all values of structs in packet properties
      if (propertyValue instanceof SendableStruct) {
        const struct = propertyValue as SendableStruct;

        const structValues = struct
          .getValidPropertyNames()
          .map(
            (structPropName) => struct[structPropName as keyof typeof struct],
          );

        values.push(...structValues);
        return;
      }

      return values.push(propertyValue);
    });

    const packedData = pack(format, values);

    if (!packedData) {
      throw new InSimError('Could not pack values into a packet');
    }

    return packedData;
  }
}
