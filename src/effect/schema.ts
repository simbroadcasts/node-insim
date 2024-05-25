import { ParseResult, Schema } from '@effect/schema';

import { PacketType, TinyType } from '../packets';

export class IS_TINY extends Schema.Class<IS_TINY>('IS_TINY')({
  Size: Schema.Number.pipe(Schema.between(0, 255)),
  Type: Schema.Literal(PacketType.ISP_TINY),
  ReqI: Schema.Number.pipe(Schema.between(0, 255)),
  SubT: Schema.Enums(TinyType),
}) {}

const Uint8ArraySchema = Schema.declare(
  (input: unknown): input is Uint8Array => input instanceof Uint8Array,
);

export const IS_TINY_Transform = Schema.transform(Uint8ArraySchema, IS_TINY, {
  decode: (buffer) => {
    // TODO
    return new IS_TINY({
      Size: 1,
      Type: PacketType.ISP_TINY,
      ReqI: 1,
      SubT: TinyType.TINY_NONE,
    });
  },
  encode: (packet) => {
    // TODO
    return new Uint8Array();
  },
});

export const BufferReaderSchema = Schema.declare(
  (input: unknown): input is BufferReader => input instanceof BufferReader,
);

export const ByteSchema = Schema.transformOrFail(
  BufferReaderSchema,
  Schema.Number.pipe(Schema.between(0, 255)),
  {
    strict: false,
    // From binary to packet data
    decode: (reader, _, ast) => {
      console.log('BYTE - DECODE');
      // try {
      //   return ParseResult.succeed(reader.readByte());
      // } catch {
      //   return ParseResult.fail(new ParseResult.Type(ast, reader));
      // }
    },
    // From packet data to binary
    encode: (data, _, ast) => {
      console.log('BYTE - ENCODE', { data });
      // try {
      //   const dataView = new DataView(new ArrayBuffer(1));
      //   dataView.setUint8(0, data);
      //
      //   return ParseResult.succeed(dataView);
      // } catch {
      //   return ParseResult.fail(new ParseResult.Type(ast, data));
      // }
    },
  },
);

export class BufferReader {
  private offset = 0;

  constructor(
    private buffer: Uint8Array,
    private dataView = new DataView(buffer.buffer),
  ) {}

  readByte(): number {
    return this.dataView.getUint8(this.offset++);
  }
}

export class BufferWriter {
  private offset = 0;

  constructor(
    private buffer: Uint8Array,
    private dataView = new DataView(buffer.buffer),
  ) {}

  writeByte(value: number): void {
    this.dataView.setUint8(this.offset++, value);
  }

  getBuffer() {
    return new Uint8Array(this.dataView.buffer);
  }
}
