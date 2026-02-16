import { PacketType } from '../enums/index.js';
import { CarContOBJ } from '../structs/index.js';
import type { PacketTestData } from '../tests';
import { testInfoPacket } from '../tests';
import { HLVCViolation, IS_HLV } from './IS_HLV.js';

const size = 20;

const data: PacketTestData<IS_HLV> = {
  ReqI: 0,
  PLID: 3,
  HLVC: HLVCViolation.WALL,
  Time: 151258902,
  C: new CarContOBJ({
    Direction: 2,
    Heading: 231,
    Speed: 4,
    Zbyte: 14,
    X: 4313,
    Y: 1433,
  }),
};

const buffer = new Uint8Array([
  size / new IS_HLV().SIZE_MULTIPLIER, // Size
  52, // Type
  0, // ReqI
  3, // PLID
  1, // HLVC
  0, // Sp1
  0, // SpW (1)
  0, // SpW (2)
  22, // C - Time (1)
  7, // C - Time (2)
  4, // C - Time (3)
  9, // C - Time (4)
  2, // C - Direction
  231, // C - Heading
  4, // C - Speed
  14, // C - Zbyte
  217, // C - X (1)
  16, // C - X (2)
  153, // C - Y (1)
  5, // C - Y (2)
]);

describe('IS_HLV', () => {
  testInfoPacket({
    packetClass: IS_HLV,
    size,
    type: PacketType.ISP_HLV,
    data,
    buffer,
  });
});
