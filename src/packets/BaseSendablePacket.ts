import { pack } from '../utils/jspack';
import { BasePacket } from './BasePacket';
import { ISendable } from './ISendable';

export abstract class BaseSendablePacket
  extends BasePacket
  implements ISendable
{
  pack(): Buffer {
    const values = [];

    for (const propertyName in this) {
      if (typeof this[propertyName] === 'function') {
        continue;
      }

      if (propertyName.startsWith('_')) {
        continue;
      }

      if (propertyName === 'Size') {
        values.push(
          (this[propertyName] as unknown as number) /
            BasePacket.SIZE_MULTIPLIER,
        );
        continue;
      }

      values.push(this[propertyName]);
    }

    return pack(this._format, values);
  }
}
