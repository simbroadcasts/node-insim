import parseLFSMessage from 'parse-lfs-message';

import { unpack } from '../utils/jspack';
import { log } from '../utils/log';
import { IPacket } from './IPacket';
import { PacketType } from './packetTypes';

type Data = Record<string, unknown>;

export abstract class BasePacket implements IPacket {
  static readonly SIZE_MULTIPLIER = 4;

  abstract _format: string;

  abstract Size: number;
  abstract Type: PacketType;
  abstract ReqI: number;

  protected populateData(data?: Partial<Data>) {
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

    log.debug('InSim packet received:', this);

    return this;
  }
}
