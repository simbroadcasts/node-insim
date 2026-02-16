import type { PacketType } from '../enums/PacketType.js';
import { InSimError } from '../errors.js';
import { pack } from '../lfspack.js';
import type { Receivable } from '../types/Receivable.js';
import type { Sendable } from '../types/Sendable.js';
import { Packet } from './Packet.js';
import { SendableStruct } from './SendableStruct.js';

export abstract class SendablePacket
  extends Packet
  implements Receivable, Sendable
{
  abstract override Size: number;
  abstract override Type: PacketType;
  abstract override ReqI: number;

  /** @ignore */
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
