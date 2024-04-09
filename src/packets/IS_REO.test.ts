import type { PacketTestData } from '../tests';
import { testInfoPacket, testInstructionPacket } from '../tests';
import { PacketType } from './enums';
import type { IS_REO_Data } from './IS_REO';
import { IS_REO } from './IS_REO';

const size = 44;

const plIds = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
];

const instructionData: IS_REO_Data = {
  NumP: 40,
  PLID: plIds,
};

const instructionBuffer = new Uint8Array([
  size / new IS_REO().SIZE_MULTIPLIER, // Size
  36, // Type
  0, // ReqI
  40, // NumP
  1, // PLID[40]
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
  32,
  33,
  34,
  35,
  36,
  37,
  38,
  39,
  40,
]);

const infoData: Omit<PacketTestData<IS_REO>, 'ReqI'> & { ReqI: number } = {
  ReqI: 2,
  NumP: 40,
  PLID: plIds,
};

const infoBuffer = new Uint8Array([
  size / new IS_REO().SIZE_MULTIPLIER, // Size
  36, // Type
  2, // ReqI
  40, // NumP
  1, // PLID[40]
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
  32,
  33,
  34,
  35,
  36,
  37,
  38,
  39,
  40,
]);

describe('IS_REO', () => {
  testInstructionPacket({
    packetClass: IS_REO,
    size,
    type: PacketType.ISP_REO,
    data: instructionData,
    buffer: instructionBuffer,
  });
  testInfoPacket({
    packetClass: IS_REO,
    size,
    type: PacketType.ISP_REO,
    data: infoData as IS_REO,
    buffer: infoBuffer,
  });

  it('should throw a range error if PLID length is greater than 40', () => {
    expect(() => {
      new IS_REO({
        NumP: 41,
        PLID: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37,
          38, 39, 40, 41,
        ],
      }).pack();
    }).toThrow(RangeError);
  });
});
