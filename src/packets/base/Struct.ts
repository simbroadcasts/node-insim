import { InSimError } from '../../protocols/InSim';
import {
  determineLength,
  getFormat,
  log as baseLog,
  unpack,
} from '../../utils';
import type { Receivable } from '../types';

const log = baseLog.extend('struct');

type Data = Record<string, unknown>;

export abstract class Struct implements Receivable {
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

  public getFormatSize(): number {
    return determineLength(`<${this.getFormat()}`);
  }

  public unpack(
    buffer: Buffer,
    propertyFormatOverrides?: Record<string, string>,
  ): this {
    const format = this.getFormat(propertyFormatOverrides);
    const data = unpack(`<${format}`, buffer);

    if (!data) {
      throw new InSimError(
        `Unpacked no data using ${format} from buffer ${buffer.join()}`,
      );
    }

    const propertyNames = this.getValidPropertyNames();
    propertyNames.forEach((propertyName, i) => {
      const value = data[i];

      if (value === undefined) {
        return;
      }

      if (propertyName === 'Size') {
        (this[propertyName as keyof this] as unknown as number) =
          (value as number) * Struct.SIZE_MULTIPLIER;
        return;
      }

      this[propertyName as keyof this] = value as this[keyof this];
    });

    log('Data unpacked:', this);

    return this;
  }
}
