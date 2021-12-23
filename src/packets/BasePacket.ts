import { PacketType } from '../packetTypes';
import { unpack } from '../utils/jspack';
import { IPacket } from './IPacket';

export abstract class BasePacket<T extends Record<string, unknown>>
  implements IPacket
{
  abstract _format: string;

  ReqI: number;
  abstract readonly Size: number;
  abstract readonly Type: PacketType;

  populateData(data: Partial<T>) {
    if (!data) {
      return;
    }

    (Object.keys(data) as string[]).forEach((key) => {
      (this as Record<string, unknown>)[key] = data[key];
    });
  }

  unpack(buffer: Buffer): this {
    const data = unpack(this._format, buffer);

    let i = 0;
    for (const propertyName in this) {
      if (typeof this[propertyName] === 'function') {
        continue;
      }

      if (propertyName.startsWith('_')) {
        continue;
      }

      this[propertyName] = data[i];
      i++;
    }

    return this;
  }

  abstract pack(): string | Uint8Array;
}
