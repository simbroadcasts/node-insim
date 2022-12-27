import { pack } from '../utils';
import { AbstractPacket } from './AbstractPacket';
import type { ISendable } from './ISendable';

type Data = Record<string, unknown>;

export abstract class AbstractSendablePacket
  extends AbstractPacket
  implements ISendable
{
  protected initialize(data?: Partial<Data> | Buffer) {
    if (!data) {
      return;
    }

    if (data instanceof Buffer) {
      this.unpack(data);
      return;
    }

    Object.assign(this, data);
  }

  pack(propertyFormatOverrides?: Record<string, string>): Buffer {
    const propertyNames = this.getValidPropertyNames();

    const values = propertyNames.map((propertyName) => {
      if (propertyName === 'Size') {
        return (
          (this[propertyName] as unknown as number) /
          AbstractPacket.SIZE_MULTIPLIER
        );
      }

      return this[propertyName as unknown as Extract<keyof this, string>];
    });

    return pack(this.getFormat(propertyFormatOverrides), values);
  }
}
