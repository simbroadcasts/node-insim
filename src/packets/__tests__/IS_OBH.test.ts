import type { PacketTestData } from '../../utils/tests';
import { testInfoPacket } from '../../utils/tests';
import { CarContOBJ, IS_OBH, ObjectHitFlags, PacketType } from '..';
import { AbstractPacket } from '../base';

const size = 24;

const data: PacketTestData<IS_OBH> = {
  ReqI: 0,
  PLID: 3,
  SpClose: 23,
  Time: 497,
  C: new CarContOBJ({
    Direction: 2,
    Heading: 254,
    Speed: 3,
    Zbyte: 9,
    X: -11004,
    Y: -31100,
  }),
  X: -10990,
  Y: -31058,
  Zbyte: 1,
  Index: 168,
  OBHFlags:
    ObjectHitFlags.OBH_LAYOUT |
    ObjectHitFlags.OBH_CAN_MOVE |
    ObjectHitFlags.OBH_ON_SPOT,
};

const buffer = Buffer.from([
  size / AbstractPacket.SIZE_MULTIPLIER, // Size
  51, // Type
  0, // ReqI
  3, // PLID
  23, // SpClose (1)
  0, // SpClose (2)
  241, // Time (1)
  1, // Time (2)
  2, // C - Direction
  254, // C - Heading
  3, // C - Speed
  9, // C - Zbyte
  4, // C - X (1)
  213, // C - X (2)
  132, // C - Y (1)
  134, // C - Y (2)
  18, // X (1)
  213, // X (2)
  174, // Y (1)
  134, // Y (2)
  1, // Zbyte
  0, // Sp1
  168, // Index
  11, // OBHFlags
]);

describe('IS_OBH', () => {
  testInfoPacket({
    packetClass: IS_OBH,
    size,
    type: PacketType.ISP_OBH,
    data,
    buffer,
  });
});
