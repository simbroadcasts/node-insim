import parseLFSMessage, { type Codepage } from 'parse-lfs-message';
import unicodeToLfs from 'unicode-to-lfs';

type LfsPack = Record<
  string,
  {
    length: number;
    pack: (
      dv: DataView,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      value: any | any[],
      offset: number,
      c: number,
      littleendian?: boolean,
    ) => void;
    unpack: (
      dv: DataView,
      offset: number,
      c: number,
      littleendian?: boolean,
      originalCodepage?: Codepage,
    ) => unknown;
  }
>;

type FormatCharacter = keyof typeof lfsPack;
type FormatChunk = FormatCharacter | `${number}${FormatCharacter}`;

/**
 * Validates a literal format string as one or more concatenated
 * {@link FormatChunk}s, e.g. `S`, `SS`, `24sDDDL`.
 * @internal
 */
export type FormatBody<S extends string> =
  S extends `${FormatChunk}${infer Rest}`
    ? Rest extends ''
      ? S
      : FormatBody<Rest> extends never
        ? never
        : S
    : never;

/**
 * A format string accepted by {@link pack}/{@link unpack}: one or more
 * {@link FormatChunk}s, optionally prefixed with `<` to request little-endian
 * packing.
 */
type Format<S extends string> = string extends S
  ? string
  : S extends `<${infer Rest}`
    ? string extends Rest
      ? string
      : FormatBody<Rest> extends never
        ? never
        : S
    : FormatBody<S>;

const lfsPack = {
  // byte array
  A: {
    length: 1,
    pack(dv, value: number | [number[]], offset, c) {
      if (Array.isArray(value)) {
        for (let i = 0; i < c; i++) {
          dv.setInt8(offset + i, value[0][i]);
        }
      } else {
        for (let i = 0; i < c; i++) {
          dv.setInt8(offset + i, [value][i]);
        }
      }
    },
    unpack(dv, offset, c) {
      const r: number[] = [];

      for (let i = 0; i < c; i++) {
        r.push(dv.getInt8(offset + i));
      }

      return [r];
    },
  },
  // padding byte
  x: {
    length: 1,
    pack(dv, value: number, offset, c) {
      for (let i = 0; i < c; i++) {
        dv.setUint8(0, offset + i);
      }
    },
    unpack(dv, offset, c) {
      const r = [];

      for (let i = 0; i < c; i++) {
        r.push(0);
      }

      return r;
    },
  },
  // char
  c: {
    length: 1,
    pack(dv, value: string | string[], offset, c) {
      if (!Array.isArray(value)) value = [value];

      for (let i = 0; i < c; i++) {
        dv.setUint8(offset + i, value[i].charCodeAt(0));
      }
    },
    unpack(dv, offset, c) {
      const r = [];

      for (let i = 0; i < c; i++) {
        r.push(String.fromCharCode(dv.getUint8(offset + i)));
      }

      return r;
    },
  },
  // LFS car name string
  C: {
    length: 4,
    pack(dv, value: string | string[], offset) {
      if (!Array.isArray(value)) value = [value];

      const carName = value[0];

      if (
        isAlphaNumeric(carName[0]) &&
        isAlphaNumeric(carName[1]) &&
        isAlphaNumeric(carName[2]) &&
        carName.length === 3
      ) {
        for (let i = 0; i < 3; i++) {
          dv.setUint8(offset + i, carName[i].charCodeAt(0));
        }
      } else if (
        isAlphaNumeric(carName[0]) &&
        isAlphaNumeric(carName[1]) &&
        isAlphaNumeric(carName[2]) &&
        carName[3] === '_' &&
        carName.length === 4
      ) {
        for (let i = 0; i < 4; i++) {
          dv.setUint8(offset + i, carName[i].charCodeAt(0));
        }
      } else {
        dv.setUint8(offset + 2, parseInt(`${carName[0]}${carName[1]}`, 16));
        dv.setUint8(offset + 1, parseInt(`${carName[2]}${carName[3]}`, 16));
        dv.setUint8(offset, parseInt(`${carName[4]}${carName[5]}`, 16));
      }
    },
    unpack(dv, offset) {
      const r: string[] = [];
      for (let i = 0; i < 4; i++)
        r.push(String.fromCharCode(dv.getUint8(offset + i)));

      if (
        isAlphaNumeric(r[0]) &&
        isAlphaNumeric(r[1]) &&
        isAlphaNumeric(r[2]) &&
        r[3] === '\x00'
      ) {
        return [r.slice(0, -1).join('')];
      }

      if (
        isAlphaNumeric(r[0]) &&
        isAlphaNumeric(r[1]) &&
        isAlphaNumeric(r[2]) &&
        r[3] === '_'
      ) {
        return [r.join('')];
      }

      return [
        [...new Uint8Array(dv.buffer.slice(offset, offset + 3))]
          .reverse()
          .map((x) => x.toString(16).toUpperCase().padStart(2, '0'))
          .join(''),
      ];
    },
  },
  // signed char
  b: {
    length: 1,
    pack(dv, value: number | number[], offset, c) {
      if (!Array.isArray(value)) value = [value];

      for (let i = 0; i < c; i++) {
        dv.setInt8(offset + i, value[i]);
      }
    },
    unpack(dv, offset, c) {
      const r = [];

      for (let i = 0; i < c; i++) {
        r.push(dv.getInt8(offset + i));
      }

      return r;
    },
  },
  // unsigned char
  B: {
    length: 1,
    pack(dv, value: number | number[], offset, c) {
      if (!Array.isArray(value)) value = [value];

      for (let i = 0; i < c; i++) {
        dv.setUint8(offset + i, value[i]);
      }
    },
    unpack(dv, offset, c) {
      const r = [];

      for (let i = 0; i < c; i++) {
        r.push(dv.getUint8(offset + i));
      }

      return r;
    },
  },
  // signed short
  h: {
    length: 2,
    pack(dv, value: number | number[], offset, c, littleendian) {
      if (!Array.isArray(value)) value = [value];

      for (let i = 0; i < c; i++) {
        dv.setInt16(offset + i, value[i], littleendian);
      }
    },
    unpack(dv, offset, c, littleendian) {
      const r = [];

      for (let i = 0; i < c; i++) {
        r.push(dv.getInt16(offset + i, littleendian));
      }

      return r;
    },
  },
  // unsigned short
  H: {
    length: 2,
    pack(dv, value: number | number[], offset, c, littleendian) {
      if (!Array.isArray(value)) value = [value];

      for (let i = 0; i < c; i++) {
        dv.setUint16(offset + i, value[i], littleendian);
      }
    },
    unpack(dv, offset, c, littleendian) {
      const r = [];

      for (let i = 0; i < c; i++) {
        r.push(dv.getUint16(offset + i, littleendian));
      }

      return r;
    },
  },
  // signed long
  i: {
    length: 4,
    pack(dv, value: number | number[], offset, c, littleendian) {
      if (!Array.isArray(value)) value = [value];

      for (let i = 0; i < c; i++) {
        dv.setInt32(offset + i, value[i], littleendian);
      }
    },
    unpack(dv, offset, c, littleendian) {
      const r = [];

      for (let i = 0; i < c; i++) {
        r.push(dv.getInt32(offset + i, littleendian));
      }

      return r;
    },
  },
  // unsigned long
  I: {
    length: 4,
    pack(dv, value: number | number[], offset, c, littleendian) {
      if (!Array.isArray(value)) value = [value];

      for (let i = 0; i < c; i++) {
        dv.setUint32(offset + i, value[i], littleendian);
      }
    },
    unpack(dv, offset, c, littleendian) {
      const r = [];

      for (let i = 0; i < c; i++) {
        r.push(dv.getUint32(offset + i, littleendian));
      }

      return r;
    },
  },
  l: {
    length: 4,
    pack(dv, value: number | number[], offset, c, littleendian) {
      if (!Array.isArray(value)) value = [value];

      for (let i = 0; i < c; i++) {
        dv.setInt32(offset + i, value[i], littleendian);
      }
    },
    unpack(dv, offset, c, littleendian) {
      const r = [];

      for (let i = 0; i < c; i++) {
        r.push(dv.getInt32(offset + i, littleendian));
      }

      return r;
    },
  },
  // unsigned long
  L: {
    length: 4,
    pack(dv, value: number | number[], offset, c, littleendian) {
      if (!Array.isArray(value)) value = [value];

      for (let i = 0; i < c; i++) {
        dv.setUint32(offset + i, value[i], littleendian);
      }
    },
    unpack(dv, offset, c, littleendian) {
      const r = [];

      for (let i = 0; i < c; i++) {
        r.push(dv.getUint32(offset + i, littleendian));
      }

      return r;
    },
  },
  // char[]
  s: {
    length: 1,
    pack(dv, value: [string], offset, c) {
      const val = unicodeToLfs(value[0], {
        isNullTerminated: false,
        length: c,
      });

      for (let i = 0; i < c; i++) {
        let code = 0;

        if (i < val.length) code = val.charCodeAt(i);

        dv.setUint8(offset + i, code);
      }
    },
    unpack(dv, offset, c, _, originalCodepage) {
      const chars = [];
      const bytes = [];

      for (let i = 0; i < c; i++) {
        chars.push(String.fromCharCode(dv.getUint8(offset + i)));
        bytes.push(dv.getUint8(offset + i));
      }

      return [
        [
          chars.join(''),
          parseLFSMessage(new Uint8Array(bytes), {
            originalCodepage,
          }),
        ],
      ];
    },
  },
  // char[] - null-terminated
  S: {
    length: 1,
    pack(dv, value: [string], offset, c) {
      const val = unicodeToLfs(value[0], {
        isNullTerminated: true,
        length: c,
      });

      for (let i = 0; i < c; i++) {
        let code = 0;

        if (i < val.length) code = val.charCodeAt(i);

        dv.setUint8(offset + i, code);
      }
    },
    unpack(dv, offset, c, _, originalCodepage) {
      const chars = [];
      const bytes = [];

      for (let i = 0; i < c; i++) {
        chars.push(String.fromCharCode(dv.getUint8(offset + i)));
        bytes.push(dv.getUint8(offset + i));
      }

      return [
        [
          chars.join(''),
          parseLFSMessage(new Uint8Array(bytes), {
            originalCodepage,
          }),
        ],
      ];
    },
  },
  // float
  f: {
    length: 4,
    pack(dv, value: number | number[], offset, c, littleendian) {
      if (!Array.isArray(value)) value = [value];

      for (let i = 0; i < c; i++) {
        dv.setFloat32(offset + i, value[i], littleendian);
      }
    },
    unpack(dv, offset, c, littleendian) {
      const r = [];

      for (let i = 0; i < c; i++) {
        r.push(dv.getFloat32(offset + i, littleendian));
      }

      return r;
    },
  },
  // double
  d: {
    length: 8,
    pack(dv, value: number | number[], offset, c, littleendian) {
      if (!Array.isArray(value)) value = [value];

      for (let i = 0; i < c; i++) {
        dv.setFloat64(offset + i, value[i], littleendian);
      }
    },
    unpack(dv, offset, c, littleendian) {
      const r = [];

      for (let i = 0; i < c; i++) {
        r.push(dv.getFloat64(offset + i, littleendian));
      }

      return r;
    },
  },
} as const satisfies LfsPack;

const lfsPackGeneral = lfsPack as LfsPack;

const formatChars = Object.keys(lfsPack);
const pattern = `(\\d+)?([${formatChars.join('')}])`;

/**
 * Determine the size of arraybuffer we'd need
 * @internal
 */
const determineLength = function <S extends string>(fmt: Format<S>): number {
  const re = new RegExp(pattern, 'g');
  let m: RegExpExecArray | null,
    sum = 0;

  while ((m = re.exec(fmt))) {
    sum +=
      (m[1] === undefined || m[1] === '' ? 1 : parseInt(m[1])) *
      lfsPackGeneral[m[2]].length;
  }

  return sum;
};

/**
 * Pack a set of values, starting at offset, based on format
 * @internal
 */
const pack = function <S extends string>(
  fmt: Format<S>,
  values: unknown[],
  offset = 0,
): Uint8Array<ArrayBuffer> | null {
  const littleendian = fmt.charAt(0) === '<';
  offset = offset ? offset : 0;

  const ab = new ArrayBuffer(determineLength(fmt)),
    dv = new DataView(ab),
    re = new RegExp(pattern, 'g');
  let m,
    c,
    l,
    i = 0;

  while ((m = re.exec(fmt))) {
    const entry = lfsPackGeneral[m[2]];

    if (entry === undefined) throw new Error('Unknown format type');

    c = m[1] === undefined || m[1] === '' ? 1 : parseInt(m[1]);
    l = entry.length;

    if (offset + c * l > ab.byteLength) return null;

    const value = values.slice(i, i + 1);

    entry.pack(dv, value, offset, c, littleendian);

    offset += c * l;
    i += 1;
  }

  return new Uint8Array(dv.buffer);
};

/**
 * Unpack an arraybuffer, starting at offset, based on format
 * @internal
 */
const unpack = <S extends string>(
  fmt: Format<S>,
  ab: ArrayBuffer,
  offset = 0,
  OriginalCodepage?: Codepage,
): unknown[] | null => {
  const littleendian = fmt.charAt(0) === '<';
  const re = new RegExp(pattern, 'g');
  let results: unknown[] = [],
    m,
    c,
    l;

  while ((m = re.exec(fmt))) {
    const entry = lfsPackGeneral[m[2]];

    if (entry === undefined) throw new Error('Unknown format type');

    c = m[1] === undefined || m[1] === '' ? 1 : parseInt(m[1]);
    l = entry.length;

    if (offset + c * l > ab.byteLength) return null;

    results = results.concat(
      entry.unpack(new DataView(ab), offset, c, littleendian, OriginalCodepage),
    );

    offset += c * l;
  }

  return results;
};

/** @internal */
function isAlphaNumeric(b: string): boolean {
  if (b >= '0' && b <= '9') return true;
  if (b >= 'A' && b <= 'Z') return true;
  if (b >= 'a' && b <= 'z') return true;
  return false;
}

/** @internal */
function copyBuffer(buffer: Uint8Array<ArrayBuffer>): Uint8Array<ArrayBuffer> {
  const dest = new ArrayBuffer(buffer.byteLength);
  const newBuffer = new Uint8Array(dest);
  newBuffer.set(buffer);

  return newBuffer;
}

/** @internal */
export { copyBuffer, determineLength, pack, unpack };
