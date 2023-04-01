import isArray from 'lodash/isArray';

import { getFormat } from '../../decorators';
import { InSimError } from '../../errors';
import { determineLength, unpack } from '../../lfspack';
import { log as baseLog } from '../../log';
import type { Receivable } from '../types';

const log = baseLog.extend('struct');

type Data = Record<string, unknown>;

type RawProperties<TThis> = {
  [P in keyof Omit<TThis, keyof Struct>]: TThis[P];
};

export class Struct implements Receivable {
  public SIZE_MULTIPLIER = 4;

  public _raw: RawProperties<this> = {} as RawProperties<this>;

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
    buffer: Uint8Array,
    propertyFormatOverrides?: Record<string, string>,
  ): this {
    const format = this.getFormat(propertyFormatOverrides);
    const data = unpack(`<${format}`, buffer.buffer);

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
          (value as number) * this.SIZE_MULTIPLIER;
        return;
      }

      if (isArray(value) && value.length === 2) {
        this[propertyName as keyof this] = value[1] as this[keyof this];
        this._raw[propertyName as keyof RawProperties<this>] = value[0];
        return;
      }

      this[propertyName as keyof this] = value as this[keyof this];
    });

    log('Data unpacked:', this);

    return this;
  }
}
