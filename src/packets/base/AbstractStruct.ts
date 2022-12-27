import parseLFSMessage from 'parse-lfs-message';

import { InSimError } from '../../protocols/InSim/InSimEvents';
import { getFormat, log as baseLog, unpack } from '../../utils';
import type { Receivable } from './Receivable';

const log = baseLog.extend('abstract-struct');

type Data = Record<string, unknown>;

export abstract class AbstractStruct implements Receivable {
  public static SIZE_MULTIPLIER = 4;

  protected initialize(data?: Partial<Data>) {
    if (!data) {
      return;
    }

    Object.assign(this, data);
  }

  public getValidPropertyNames(): string[] {
    const prototype = Object.getPrototypeOf(this);
    const ownPropertyNames = Object.getOwnPropertyNames(this) as string[];
    const prototypePropertyNames = Object.keys(
      Object.getOwnPropertyDescriptors(prototype),
    ) as string[];

    return [...ownPropertyNames, ...prototypePropertyNames].filter(
      (propertyName) => getFormat(this, propertyName) !== undefined,
    );
  }

  public getFormat(propertyFormats?: Record<string, string>): string {
    const propertyNames = this.getValidPropertyNames();

    return propertyNames
      .map(
        (propertyName) =>
          propertyFormats?.[propertyName as string] ??
          getFormat(this, propertyName),
      )
      .join('');
  }

  public unpack(
    buffer: Buffer,
    propertyFormatOverrides?: Record<string, string>,
  ): this {
    const format = this.getFormat(propertyFormatOverrides);
    const data = unpack(`<${format}`, buffer);

    log(`Unpack format: ${format}`);

    if (!data) {
      throw new InSimError(
        `Unpacked no data using ${format} from buffer ${buffer.join()}`,
      );
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
        (this[propertyName as keyof this] as unknown as number) =
          value * AbstractStruct.SIZE_MULTIPLIER;
        return;
      }

      this[propertyName as keyof this] = value;
    });

    log('Data unpacked:', this);

    return this;
  }
}
