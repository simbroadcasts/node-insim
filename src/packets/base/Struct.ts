import type { AnyObjectSchema } from 'typed-binary';
import { BufferReader, MaxValue } from 'typed-binary';

import { getFormat } from '../../decorators';
import { log as baseLog } from '../../log';
import type { Receivable } from '../types';

const log = baseLog.extend('struct');

type Data = Record<string, unknown>;

// type RawProperties<TThis> = {
//   [P in keyof Omit<TThis, keyof Struct>]: TThis[P];
// };

// class CustomBufferReader extends BufferReader {
//   constructor(buffer: ArrayBufferLike, private sizeMultiplier = 1) {
//     super(buffer);
//   }
//
//   readByte() {
//     this.uint8View[this.byteOffset] =
//       this.uint8View[this.byteOffset] * this.sizeMultiplier;
//     return super.readByte();
//   }
// }

export abstract class Struct<Schema extends AnyObjectSchema = AnyObjectSchema>
  implements Receivable
{
  protected abstract schema: Schema;

  public SIZE_MULTIPLIER = 4;

  // TODO
  // public _raw: RawProperties<this> = {} as RawProperties<this>;

  protected initialize(data?: Partial<Data>) {
    if (!data) {
      return;
    }

    Object.assign(this, data);
  }

  public getValidPropertyNames(): string[] {
    return Object.keys(this.schema.properties);
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
    return this.schema.measure(MaxValue).size;
  }

  public unpack(
    buffer: Uint8Array,
    propertyFormatOverrides?: Record<string, string>,
  ): this {
    const reader = new BufferReader(buffer);
    const parsed = this.schema.read(reader);

    this.initialize(parsed);

    return this;
  }
}
