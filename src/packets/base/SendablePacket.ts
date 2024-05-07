import { BufferWriter } from 'typed-binary';

import type { PacketType } from '../enums';
import type { Receivable, Sendable } from '../types';
import { Packet } from './Packet';

export abstract class SendablePacket
  extends Packet
  implements Receivable, Sendable
{
  abstract Size: number;
  abstract Type: PacketType;
  abstract ReqI: number;

  pack(propertyFormatOverrides?: Record<string, string>) {
    const buffer = new ArrayBuffer(this.getFormatSize());
    const writer = new BufferWriter(buffer);

    const propertyNames = this.getValidPropertyNames();
    const values = propertyNames.reduce(
      (acc, propertyName) => ({
        ...acc,
        [propertyName]: this[propertyName as keyof this],
      }),
      {},
    );

    this.schema.write(writer, values);

    return new Uint8Array(buffer);
  }
}
