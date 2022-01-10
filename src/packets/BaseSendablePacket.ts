import { pack } from '../utils/jspack';
import { log } from '../utils/log';
import { BasePacket } from './BasePacket';
import { getFormat } from './decorators';
import { ISendable } from './ISendable';

export abstract class BaseSendablePacket
  extends BasePacket
  implements ISendable
{
  pack(): Buffer {
    const propertyNames = this.getValidPropertyNames();

    const values = propertyNames.map((propertyName) => {
      if (propertyName === 'Size') {
        return (
          (this[propertyName] as unknown as number) / BasePacket.SIZE_MULTIPLIER
        );
      }

      return this[propertyName as unknown as Extract<keyof this, string>];
    });

    const formatArray = propertyNames.map((propertyName) =>
      getFormat(this, propertyName),
    );

    const format = formatArray.join('');

    return pack(`<${format}`, values);
  }
}
