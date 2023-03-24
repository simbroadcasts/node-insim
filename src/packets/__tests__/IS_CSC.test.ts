import type { PacketTestData } from '../../tests';
import { testInfoPacket } from '../../tests';
import { CarContOBJ, CSCAction, IS_CSC, PacketType } from '..';

const size = 20;

const data: PacketTestData<IS_CSC> = {
  PLID: 2,
  CSCAction: CSCAction.CSC_START,
  Time: 3141,
  C: new CarContOBJ({
    Direction: 4,
    Heading: 3,
    Speed: 1,
    Zbyte: 39,
    X: -2456,
    Y: 1487,
  }),
};

const buffer = new Uint8Array([
  size / new IS_CSC().SIZE_MULTIPLIER, // Size
  63, // Type
  0, // ReqI
  2, // PLID
  0, // Sp0
  1, // CSCAction
  0, // Sp2
  0, // Sp3
  69, // Time (1)
  12, // Time (2)
  0, // Time (3)
  0, // Time (4)
  4, // C - Direction
  3, // C - Heading
  1, // C - Speed
  39, // C - Zbyte
  104, // C - X (1)
  246, // C - X (2)
  207, // C - Y (1)
  5, // C - Y (2)
]);

describe('IS_CSC', () => {
  testInfoPacket({
    packetClass: IS_CSC,
    type: PacketType.ISP_CSC,
    size,
    data,
    buffer,
  });
});
