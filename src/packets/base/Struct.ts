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
    let i = 0;
    propertyNames.forEach((propertyName) => {
      const value = data[i];
      if (i >= data.length) {
        return;
      }

      const propertyType = typeof this[propertyName as keyof this];

      if (value === undefined) {
        i++;
        return;
      }

      if (propertyName === 'Size') {
        (this[propertyName as keyof this] as unknown as number) =
          (value as number) * this.SIZE_MULTIPLIER;
        i++;
        return;
      }

      if (isArray(value) && value.length === 2) {
        this[propertyName as keyof this] = value[1] as this[keyof this];
        this._raw[propertyName as keyof RawProperties<this>] = value[0];
        i++;
        return;
      }

      if (isArray(value) && isArray(this[propertyName as keyof this])) {
        this[propertyName as keyof this] = value as this[keyof this];
        i++;
        return;
      }

      if (propertyType == 'object') {
        i = this.ParseObject(
          this[propertyName as keyof this],
          data,
          i,
          propertyName,
        );
        return;
      }

      this[propertyName as keyof this] = value as this[keyof this];
      i++;
    });

    log('Data unpacked:', this);

    return this;
  }

  public ParseArray(
    instance: unknown[],
    data: unknown[],
    i: number,
    instanceName: string,
  ): number {
    for (let j = 0; j < instance.length; j++) {
      const item = instance[j];
      if (typeof item === 'object') {
        i = this.ParseObject(item, data, i, `${instanceName}[${j}]`);
      } else {
        instance[j] = data[i];
        i++;
      }
    }
    return i;
  }

  public ParseObject(
    instance: unknown,
    data: unknown[],
    i: number,
    instanceName: string,
  ): number {
    if (isArray(instance)) {
      return this.ParseArray(instance, data, i, instanceName);
    }

    if (instance instanceof Struct) {
      const propertyNames = instance.getValidPropertyNames();
      propertyNames.forEach((propertyName) => {
        const propInstance = instance[propertyName as keyof Struct];
        const sval = data[i];
        const propType = typeof propInstance;
        const fullName = `${instanceName}.${propertyName}`;
        if (propType === 'object') {
          i = this.ParseObject(propInstance, data, i, fullName);
          return;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        instance[propertyName as keyof Struct] = sval as any;
        i++;
      });
    } else {
      // should be handled by other parts of unpack function
      // because instance here is a reference to the target property and setter can't be accessed
      i++;
    }
    return i;
  }
}
