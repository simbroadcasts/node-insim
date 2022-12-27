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

    const values = propertyNames.map((propertyName) => {
      if (propertyName === 'Size') {
        return (
          (this[propertyName] as unknown as number) /
          AbstractSendablePacket.SIZE_MULTIPLIER
        );
      }

      return this[propertyName];
    });

    return pack(this.getFormat(propertyFormatOverrides), values);
  }
}
