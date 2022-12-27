import type { PacketTestData } from '../../utils/tests';
import { testInfoPacket, testInstructionPacket } from '../../utils/tests';
import type { IS_REO_Data } from '..';
import { IS_REO, PacketType } from '..';
import { Packet } from '../base';

const size = 44;

const plIds = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
];

const instructionData: IS_REO_Data = {
  NumP: 10,
  PLID: plIds,
};

const instructionBuffer = Buffer.from([
  size / Packet.SIZE_MULTIPLIER, // Size
  36, // Type
  0, // ReqI
  10, // NumP
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
  NumP: 10,
  PLID: plIds,
};

const infoBuffer = Buffer.from([
  size / Packet.SIZE_MULTIPLIER, // Size
  36, // Type
  2, // ReqI
  10, // NumP
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
