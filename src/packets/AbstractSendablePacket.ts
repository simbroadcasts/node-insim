import { pack } from '../utils';
import { AbstractPacket } from './AbstractPacket';
import type { ISendablePacket } from './ISendablePacket';

type Data = Record<string, unknown>;

export abstract class AbstractSendablePacket
  extends AbstractPacket
  implements ISendablePacket
{
  protected initialize(data?: Partial<Data>) {
    if (!data) {
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

      return this[propertyName];
    });

    return pack(this.getFormat(propertyFormatOverrides), values);
  }
}
