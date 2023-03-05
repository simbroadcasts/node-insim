import { pack, unpack } from './lfspack';

const map = new Map<[string, unknown[]], number[]>([
  // char
  [
    ['cc', ['b', '!']],
    [98, 33],
  ],
  // byte array
  [
    ['AA', [[98], [33]]],
    [98, 33],
  ],
  [
    ['3A', [[98, 33, 65]]],
    [98, 33, 65],
  ],
  // LFS car name string
  [
    ['C', ['XRT']],
    [88, 82, 84, 0],
  ],
  [
    ['C', ['5882E6']],
    [230, 130, 88, 0],
  ],
  // 1-byte signed integer
  [
    ['bbbbbb', [127, 45, 0, -1, -45, -128]],
    [127, 45, 0, 255, 211, 128],
  ],
  // 1-byte unsigned integer
  [
    ['BBB', [0, 127, 255]],
    [0, 127, 255],
  ],
  // 2-byte signed integer
  [
    ['hhhhhh', [-32768, 45, 0, -1, -45, 32767]],
    [128, 0, 0, 45, 0, 0, 255, 255, 255, 211, 127, 255],
  ],
  // 2-byte unsigned integer
  [
    ['HHH', [0, 32768, 65535]],
    [0, 0, 128, 0, 255, 255],
  ],
  // 4-byte signed integer
  [
    ['iiiiii', [-2147483648, 45, 0, -1, -45, 2147483647]],
    [
      128, 0, 0, 0, 0, 0, 0, 45, 0, 0, 0, 0, 255, 255, 255, 255, 255, 255, 255,
      211, 127, 255, 255, 255,
    ],
  ],
  [
    ['llllll', [-2147483648, 45, 0, -1, -45, 2147483647]],
    [
      128, 0, 0, 0, 0, 0, 0, 45, 0, 0, 0, 0, 255, 255, 255, 255, 255, 255, 255,
      211, 127, 255, 255, 255,
    ],
  ],
  // 4-byte unsigned integer
  [
    ['III', [0, 222, 4294967295]],
    [0, 0, 0, 0, 0, 0, 0, 222, 255, 255, 255, 255],
  ],
  [
    ['LLL', [0, 222, 4294967295]],
    [0, 0, 0, 0, 0, 0, 0, 222, 255, 255, 255, 255],
  ],
  // LFS-encoded string
  [
    ['3s', ['abc']],
    [97, 98, 99],
  ],
  // 4-byte float
  [
    ['fff', [0.000009999999747378752, 0, -345344442368]],
    [55, 39, 197, 172, 0, 0, 0, 0, 210, 160, 208, 68],
  ],
  // 8-byte double
  [
    ['ddd', [0.000009999999747378752, 0, -345344442368]],
    [
      62, 228, 248, 181, 128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 194, 84, 26, 8,
      128, 0, 0, 0,
    ],
  ],
]);

describe('lfspack', () => {
  map.forEach((buffer, [format, values]) => {
    it(`'${format}' should pack [${values}] into [${buffer}]`, () => {
      expect(pack(format, values)).toEqual(Buffer.from(buffer));
    });
    it(`'${format}' should unpack [${buffer}] into [${values}]`, () => {
      expect(unpack(format, Buffer.from(buffer))).toEqual(values);
    });
  });
});
