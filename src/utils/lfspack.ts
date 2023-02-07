import parseLFSMessage from 'parse-lfs-message';

import type { KeyOfType } from './index';

type ReadFunc = (offset?: number) => number;
type WriteFunc = (value: number, offset?: number) => number;

const common = {
  pack: (
    method: KeyOfType<Buffer, WriteFunc>,
    dv: Buffer,
    value: number | number[],
    offset: number,
    c: number,
  ) => {
    if (!Array.isArray(value)) value = [value];

    for (let i = 0; i < c; i++) dv[method](value[i], offset + i);
  },
  unpack: (
    method: KeyOfType<Buffer, ReadFunc>,
    dv: Buffer,
    offset: number,
    c: number,
  ) => {
    const r = [];
    for (let i = 0; i < c; i++) r.push(dv[method](offset + i));

    return r;
  },
};

function isAlphaNumeric(b: string): boolean {
  if (b >= '0' && b <= '9') return true;
  if (b >= 'A' && b <= 'Z') return true;
  if (b >= 'a' && b <= 'z') return true;
  return false;
}

// pack and unpacking for different types
const magic: Record<
  string,
  {
    length: number;
    pack: (
      dv: Buffer,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      value: any | any[],
      offset: number,
      c: number,
      littleendian?: boolean,
    ) => void;
    unpack: (
      dv: Buffer,
      offset: number,
      c: number,
      littleendian?: boolean,
    ) => unknown;
  }
> = {
  // byte array
  A: {
    length: 1,
    pack(dv, value: number | number[], offset, c) {
      if (Array.isArray(value)) {
        // TODO
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        common.pack('writeInt8', dv, ...value, offset, c);
      } else {
        common.pack('writeInt8', dv, value, offset, c);
      }
    },
    unpack(dv, offset, c) {
      return [common.unpack('readInt8', dv, offset, c)];
    },
  },
  // padding byte
  x: {
    length: 1,
    pack(dv, value: number, offset, c) {
      for (let i = 0; i < c; i++) dv.writeUInt8(0, offset + i);
    },
    unpack(dv, offset, c) {
      const r = [];
      for (let i = 0; i < c; i++) r.push(0);

      return r;
    },
  },
  // char
  c: {
    length: 1,
    pack(dv, value: string | string[], offset, c) {
      if (!Array.isArray(value)) value = [value];

      for (let i = 0; i < c; i++)
        dv.writeUInt8(value[i].charCodeAt(0), offset + i);
    },
    unpack(dv, offset, c) {
      const r = [];
      for (let i = 0; i < c; i++)
        r.push(String.fromCharCode(dv.readUInt8(offset + i)));

      return r;
    },
  },
  // LFS car name string
  C: {
    length: 4,
    pack(dv, value: string | string[], offset, c) {
      if (!Array.isArray(value)) value = [value];

      for (let i = 0; i < c; i++) {
        dv.writeUInt32LE(Number.parseInt(value[i], 16), offset + i);
      }
    },
    unpack(dv, offset) {
      const r: string[] = [];
      for (let i = 0; i < 4; i++)
        r.push(String.fromCharCode(dv.readUInt8(offset + i)));

      if (
        isAlphaNumeric(r[0]) &&
        isAlphaNumeric(r[1]) &&
        isAlphaNumeric(r[2]) &&
        r[3] === '\x00'
      ) {
        return [r.slice(0, -1).join('')];
      }

      return [
        [
          dv.toString('hex', offset + 2, offset + 3),
          dv.toString('hex', offset + 1, offset + 2),
          dv.toString('hex', offset, offset + 1),
        ]
          .join('')
          .toUpperCase(),
      ];
    },
  },
  // signed char
  b: {
    length: 1,
    pack(dv, value: number, offset, c) {
      common.pack('writeInt8', dv, value, offset, c);
    },
    unpack(dv, offset, c) {
      return common.unpack('readInt8', dv, offset, c);
    },
  },
  // unsigned char
  B: {
    length: 1,
    pack(dv, value: number, offset, c) {
      common.pack('writeUInt8', dv, value, offset, c);
    },
    unpack(dv, offset, c) {
      return common.unpack('readUInt8', dv, offset, c);
    },
  },
  // signed short
  h: {
    length: 2,
    pack(dv, value: number, offset, c, littleendian) {
      common.pack(
        ('writeInt16' + (littleendian ? 'LE' : 'BE')) as
          | 'writeInt16LE'
          | 'writeInt16BE',
        dv,
        value,
        offset,
        c,
      );
    },
    unpack(dv, offset, c, littleendian) {
      return common.unpack(
        ('readInt16' + (littleendian ? 'LE' : 'BE')) as
          | 'readInt16LE'
          | 'readInt16BE',
        dv,
        offset,
        c,
      );
    },
  },
  // unsigned short
  H: {
    length: 2,
    pack(dv, value: number, offset, c, littleendian) {
      common.pack(
        ('writeUInt16' + (littleendian ? 'LE' : 'BE')) as
          | 'writeUInt16LE'
          | 'writeUInt16BE',
        dv,
        value,
        offset,
        c,
      );
    },
    unpack(dv, offset, c, littleendian) {
      return common.unpack(
        ('readUInt16' + (littleendian ? 'LE' : 'BE')) as
          | 'readUInt16LE'
          | 'readUInt16BE',
        dv,
        offset,
        c,
      );
    },
  },
  // signed long
  i: {
    length: 4,
    pack(dv, value: number, offset, c, littleendian) {
      common.pack(
        ('writeInt32' + (littleendian ? 'LE' : 'BE')) as
          | 'writeInt32LE'
          | 'writeInt32BE',
        dv,
        value,
        offset,
        c,
      );
    },
    unpack(dv, offset, c, littleendian) {
      return common.unpack(
        ('readInt32' + (littleendian ? 'LE' : 'BE')) as
          | 'readInt32LE'
          | 'readInt32BE',
        dv,
        offset,
        c,
      );
    },
  },
  // unsigned long
  I: {
    length: 4,
    pack(dv, value: number, offset, c, littleendian) {
      common.pack(
        ('writeUInt32' + (littleendian ? 'LE' : 'BE')) as
          | 'writeInt16LE'
          | 'writeInt16BE',
        dv,
        value,
        offset,
        c,
      );
    },
    unpack(dv, offset, c, littleendian) {
      return common.unpack(
        ('readUInt32' + (littleendian ? 'LE' : 'BE')) as
          | 'readUInt32LE'
          | 'readUInt32BE',
        dv,
        offset,
        c,
      );
    },
  },
  l: {
    length: 4,
    pack(dv, value: number, offset, c, littleendian) {
      common.pack(
        ('writeInt32' + (littleendian ? 'LE' : 'BE')) as
          | 'writeInt32LE'
          | 'writeInt32BE',
        dv,
        value,
        offset,
        c,
      );
    },
    unpack(dv, offset, c, littleendian) {
      return common.unpack(
        ('readInt32' + (littleendian ? 'LE' : 'BE')) as
          | 'readInt32LE'
          | 'readInt32BE',
        dv,
        offset,
        c,
      );
    },
  },
  // unsigned long
  L: {
    length: 4,
    pack(dv, value: number, offset, c, littleendian) {
      common.pack(
        ('writeUInt32' + (littleendian ? 'LE' : 'BE')) as
          | 'writeUInt32LE'
          | 'writeUInt32BE',
        dv,
        value,
        offset,
        c,
      );
    },
    unpack(dv, offset, c, littleendian) {
      return common.unpack(
        ('readUInt32' + (littleendian ? 'LE' : 'BE')) as
          | 'readUInt32LE'
          | 'readUInt32BE',
        dv,
        offset,
        c,
      );
    },
  },
  // char[]
  s: {
    length: 1,
    pack(dv, value: string, offset, c) {
      const val = String(value[0]);

      for (let i = 0; i < c; i++) {
        let code = 0;

        if (i < val.length) code = val.charCodeAt(i);

        dv.writeUInt8(code, offset + i);
      }
    },
    unpack(dv, offset, c) {
      const r = [];
      for (let i = 0; i < c; i++) r.push(dv.readUInt8(offset + i));

      return [parseLFSMessage(Buffer.from(r))];
    },
  },
  // float
  f: {
    length: 4,
    pack(dv, value: number, offset, c, littleendian) {
      common.pack(
        ('writeFloat' + (littleendian ? 'LE' : 'BE')) as
          | 'writeFloatLE'
          | 'writeFloatBE',
        dv,
        value,
        offset,
        c,
      );
    },
    unpack(dv, offset, c, littleendian) {
      return common.unpack(
        ('readFloat' + (littleendian ? 'LE' : 'BE')) as
          | 'readFloatLE'
          | 'readFloatBE',
        dv,
        offset,
        c,
      );
    },
  },
  // double
  d: {
    length: 8,
    pack(dv, value: number, offset, c, littleendian) {
      common.pack(
        ('writeDouble' + (littleendian ? 'LE' : 'BE')) as
          | 'writeDoubleLE'
          | 'writeDoubleBE',
        dv,
        value,
        offset,
        c,
      );
    },
    unpack(dv, offset, c, littleendian) {
      return common.unpack(
        ('readDouble' + (littleendian ? 'LE' : 'BE')) as
          | 'readDoubleLE'
          | 'readDoubleBE',
        dv,
        offset,
        c,
      );
    },
  },
};

// pattern of stuff we're looking for
const pattern = '(\\d+)?([AxcCbBhHsfdiIlL])';

// determine the size of arraybuffer we'd need
const determineLength = function (fmt: string): number {
  const re = new RegExp(pattern, 'g');
  let m: string[] | null,
    sum = 0;

  while ((m = re.exec(fmt)))
    sum +=
      (m[1] == undefined || m[1] == '' ? 1 : parseInt(m[1])) *
      magic[m[2]].length;

  return sum;
};

// pack a set of values, starting at offset, based on format
const pack = function (
  fmt: string,
  values: unknown[],
  offset = 0,
): Buffer | null {
  const littleendian = fmt.charAt(0) == '<';
  offset = offset ? offset : 0;

  const ab = Buffer.alloc(determineLength(fmt)),
    re = new RegExp(pattern, 'g');
  let m,
    c,
    l,
    i = 0;

  while ((m = re.exec(fmt))) {
    if (magic[m[2]] == undefined) throw new Error('Unknown format type');

    c = m[1] == undefined || m[1] == '' ? 1 : parseInt(m[1]);
    l = magic[m[2]].length;

    if (offset + c * l > ab.length) return null;

    const value = values.slice(i, i + 1);

    magic[m[2]].pack(ab, value, offset, c, littleendian);

    offset += c * l;
    i += 1;
  }

  return ab;
};

// unpack an arraybuffer, starting at offset, based on format
// returns an array
const unpack = (fmt: string, ab: Buffer, offset = 0): unknown[] | null => {
  const littleendian = fmt.charAt(0) == '<';
  const re = new RegExp(pattern, 'g');
  let results: unknown[] = [],
    m,
    c,
    l;

  while ((m = re.exec(fmt))) {
    if (magic[m[2]] == undefined) throw new Error('Unknown format type');

    c = m[1] == undefined || m[1] == '' ? 1 : parseInt(m[1]);
    l = magic[m[2]].length;

    if (offset + c * l > ab.length) return null;

    results = results.concat(magic[m[2]].unpack(ab, offset, c, littleendian));

    offset += c * l;
  }

  return results;
};

export { determineLength, pack, unpack };
