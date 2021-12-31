import parseLFSMessage from 'parse-lfs-message';

import { unpack } from '../utils/jspack';
import { IPacket } from './IPacket';
import { PacketType } from './packetTypes';

type Data = Record<string, unknown>;

export abstract class BasePacket implements IPacket {
  abstract _format: string;

  abstract Size: number;
  abstract Type: PacketType;
  ReqI: number;

  protected static readonly SIZE_MULTIPLIER = 4;

  protected populateData(data: Partial<Data>) {
    if (!data) {
      return;
    }

    (Object.keys(data) as string[]).forEach((key) => {
      (this as Data)[key] = data[key];
    });
  }

  unpack(buffer: Buffer): this {
    const data = unpack(this._format, buffer);

    if (!data) {
      return this;
    }

    let i = 0;
    for (const propertyName in this) {
      if (typeof this[propertyName] === 'function') {
        continue;
      }

      if (propertyName.startsWith('_')) {
        continue;
      }

      let value = data[i];

      if (typeof value === 'string' && value.length > 0) {
        value = parseLFSMessage(value);
      }

      if (propertyName === 'Size') {
        (this[propertyName] as unknown as number) =
          value * BasePacket.SIZE_MULTIPLIER;
        i++;
        continue;
      }

      this[propertyName] = value;
      i++;
    }

    return this;
  }
}
