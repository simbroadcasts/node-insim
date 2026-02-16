import { CarFlags, PacketType } from '../enums/index.js';
import { testBothWaysPacket } from '../tests';
import type { IS_SMALL_Data } from './IS_SMALL.js';
import { SmallType } from './IS_SMALL.js';
import { IS_SMALL } from './IS_SMALL.js';

const size = 8;

const data: IS_SMALL_Data = {
  SubT: SmallType.SMALL_ALC,
  UVal: CarFlags.BF1 | CarFlags.RAC,
};

const buffer = new Uint8Array([
  size / new IS_SMALL().SIZE_MULTIPLIER, // Size
  4, // Type
  0, // ReqI
  8, // SubT
  0, // UVal (1)
  2, // UVal (2)
  4, // UVal (3)
  0, // UVal (4)
]);

describe('IS_SMALL', () => {
  testBothWaysPacket({
    packetClass: IS_SMALL,
    size,
    type: PacketType.ISP_SMALL,
    data,
    buffer,
  });
});
