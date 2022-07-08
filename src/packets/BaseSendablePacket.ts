import { pack } from '../utils';
import { BasePacket } from './BasePacket';
import type { ISendable } from './ISendable';

type Data = Record<string, unknown>;

export abstract class BaseSendablePacket
  extends BasePacket
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
          (this[propertyName] as unknown as number) / BasePacket.SIZE_MULTIPLIER
        );
      }

      return this[propertyName as unknown as Extract<keyof this, string>];
    });

    return pack(this.getFormat(propertyFormatOverrides), values);
  }
}
