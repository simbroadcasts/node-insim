import parseLFSMessage from 'parse-lfs-message';

import { getFormat, log as baseLog, unpack } from '../utils';

const log = baseLog.extend('abstract-struct');
const logError = baseLog.extend('abstract-struct:error');

export abstract class AbstractStruct {
  static readonly SIZE_MULTIPLIER = 4;

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
    const format = this.getFormat(propertyFormatOverrides);
    const data = unpack(format, buffer);

    log(`Unpack format: ${format}`);

    if (!data) {
      logError(`Unpacked no data using ${format} from buffer`, buffer.join());
      return this;
    }

    const propertyNames = this.getValidPropertyNames();
    propertyNames.forEach((propertyName, i) => {
      let value = data[i];

      if (value === undefined) {
        return;
      }

      if (typeof value === 'string' && value.length > 0) {
        value = parseLFSMessage(value);
      }

      if (propertyName === 'Size') {
        (this[propertyName] as unknown as number) =
          value * AbstractStruct.SIZE_MULTIPLIER;
        return;
      }

      this[propertyName as unknown as Extract<keyof this, string>] = value;
    });

    log('Data unpacked:', this);

    return this;
  }
}
