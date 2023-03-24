import parseLFSMessage from 'parse-lfs-message';

const magic: Record<
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
    ) => unknown;
  }
> = {
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
    pack(dv, value: string, offset, c) {
      const val = String(value[0]);

      for (let i = 0; i < c; i++) {
        let code = 0;

        if (i < val.length) code = val.charCodeAt(i);

        dv.setUint8(offset + i, code);
      }
    },
    unpack(dv, offset, c) {
      const r = [];
      for (let i = 0; i < c; i++) r.push(dv.getUint8(offset + i));

      return [parseLFSMessage(new Uint8Array(r))];
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
};

// pattern of stuff we're looking for
const pattern = '(\\d+)?([AxcCbBhHsfdiIlL])';

/** Determine the size of arraybuffer we'd need */
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

/** Pack a set of values, starting at offset, based on format */
const pack = function (
  fmt: string,
  values: unknown[],
  offset = 0,
): Uint8Array | null {
  const littleendian = fmt.charAt(0) == '<';
  offset = offset ? offset : 0;

  const ab = new ArrayBuffer(determineLength(fmt)),
    dv = new DataView(ab),
    re = new RegExp(pattern, 'g');
  let m,
    c,
    l,
    i = 0;

  while ((m = re.exec(fmt))) {
    if (magic[m[2]] == undefined) throw new Error('Unknown format type');

    c = m[1] == undefined || m[1] == '' ? 1 : parseInt(m[1]);
    l = magic[m[2]].length;

    if (offset + c * l > ab.byteLength) return null;

    const value = values.slice(i, i + 1);

    magic[m[2]].pack(dv, value, offset, c, littleendian);

    offset += c * l;
    i += 1;
  }

  return new Uint8Array(dv.buffer);
};

/** Unpack an arraybuffer, starting at offset, based on format */
const unpack = (fmt: string, ab: ArrayBuffer, offset = 0): unknown[] | null => {
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

    if (offset + c * l > ab.byteLength) return null;

    results = results.concat(
      magic[m[2]].unpack(new DataView(ab), offset, c, littleendian),
    );

    offset += c * l;
  }

  return results;
};

function isAlphaNumeric(b: string): boolean {
  if (b >= '0' && b <= '9') return true;
  if (b >= 'A' && b <= 'Z') return true;
  if (b >= 'a' && b <= 'z') return true;
  return false;
}

export { determineLength, pack, unpack };
