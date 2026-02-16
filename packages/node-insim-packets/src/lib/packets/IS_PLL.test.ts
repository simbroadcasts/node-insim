import { PacketType } from '../enums/index.js';
import type { PacketTestData } from '../tests';
import { testInfoPacket } from '../tests';
import { IS_PLL } from './IS_PLL.js';

const size = 4;

const data: PacketTestData<IS_PLL> = {
  ReqI: 0,
  PLID: 2,
};

const buffer = new Uint8Array([
  size / new IS_PLL().SIZE_MULTIPLIER, // Size
  23, // Type
  0, // ReqI
  2, // PLID
]);

describe('IS_PLL', () => {
  testInfoPacket({
    packetClass: IS_PLL,
    size,
    type: PacketType.ISP_PLL,
    data,
    buffer,
  });
});
