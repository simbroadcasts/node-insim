import parseLFSMessage from 'parse-lfs-message';

import { getFormat, log as baseLog, unpack } from '../utils';
import { PacketType } from './enums';
import type { IPacket } from './IPacket';

const log = baseLog.extend('base-packet');
const logError = baseLog.extend('base-packet:error');

export abstract class BasePacket implements IPacket {
  static readonly SIZE_MULTIPLIER = 4;

  abstract Size: number;
  abstract Type: PacketType;
  abstract ReqI: number;

  protected getValidPropertyNames(): (keyof this)[] {
    const prototype = Object.getPrototypeOf(this);
    const ownPropertyNames = Object.getOwnPropertyNames(this) as (keyof this)[];
    const prototypePropertyNames = Object.keys(
      Object.getOwnPropertyDescriptors(prototype),
    ) as (keyof this)[];
    return [...ownPropertyNames, ...prototypePropertyNames].filter(
      (propertyName) => getFormat(this, propertyName) !== undefined,
    );
  }

  protected getFormat(propertyFormats?: Record<string, string>): string {
    const propertyNames = this.getValidPropertyNames();
    const format = propertyNames
      .map(
        (propertyName) =>
          propertyFormats?.[propertyName as string] ??
          getFormat(this, propertyName),
      )
      .join('');

    return `<${format}`;
  }

  public unpack(
    buffer: Buffer,
    propertyFormatOverrides?: Record<string, string>,
  ): this {
    const packetType = PacketType[this.Type];
    const format = this.getFormat(propertyFormatOverrides);
    const data = unpack(format, buffer);

    log(`Unpack format: ${format}`);

    if (!data) {
      logError(
        `${packetType} - Unpacked no data using ${format} from buffer`,
        buffer.join(),
      );
      return this;
    }

    const propertyNames = this.getValidPropertyNames();
    propertyNames.forEach((propertyName, i) => {
      let value = data[i];

      if (typeof value === 'string' && value.length > 0) {
        value = parseLFSMessage(value);
      }

      if (propertyName === 'Size') {
        (this[propertyName] as unknown as number) =
          value * BasePacket.SIZE_MULTIPLIER;
        return;
      }

      if (value === undefined) {
        return;
      }

      this[propertyName as unknown as Extract<keyof this, string>] = value;
    });

    log('Packet data unpacked:', this);

    return this;
  }
}
