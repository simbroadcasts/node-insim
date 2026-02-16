import { PacketType } from '../enums/index.js';
import { CarContOBJ, ObjectInfo } from '../structs/index.js';
import type { PacketTestData } from '../tests';
import { testInfoPacket } from '../tests';
import { IS_UCO, UCOAction } from './IS_UCO.js';

const size = 28;

const data: PacketTestData<IS_UCO> = {
  PLID: 2,
  UCOAction: UCOAction.UCO_CIRCLE_LEAVE,
  Time: 151560,
  C: new CarContOBJ({
    Direction: 0,
    Heading: 126,
    Speed: 8,
    X: -314,
    Y: -1496,
    Zbyte: 10,
  }),
  Info: new ObjectInfo({
    X: -280,
    Y: -1585,
    Zbyte: 8,
    Flags: 24,
    Index: 253,
    Heading: 1,
  }),
};

const buffer = new Uint8Array([
  size / new IS_UCO().SIZE_MULTIPLIER, // Size
  59, // Type
  0, // ReqI
  2, // PLID
  0, // Sp0
  1, // UCOAction
  0, // Sp2
  0, // Sp3
  8, // Time (1)
  80, // Time (2)
  2, // Time (3)
  0, // Time (4)
  0, // C - Direction
  126, // C - Heading
  8, // C - Speed
  10, // C - Zbyte
  198, // C - X (1)
  254, // C - X (2)
  40, // C - Y (1)
  250, // C - Y (2)
  232, // Info - X (1)
  254, // Info - X (2)
  207, // Info - Y (1)
  249, // Info - Y (2)
  8, // Info - Zbyte
  24, // Info - Flags
  253, // Info - Index
  1, // Info - Heading
]);

describe('IS_UCO', () => {
  testInfoPacket({
    packetClass: IS_UCO,
    type: PacketType.ISP_UCO,
    size,
    data,
    buffer,
  });
});
