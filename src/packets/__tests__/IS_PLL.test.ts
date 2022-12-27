import type { PacketTestData } from '../../utils/tests';
import { testInfoPacket } from '../../utils/tests';
import { IS_PLL, PacketType } from '..';
import { AbstractPacket } from '../base';

const size = 4;

const data: PacketTestData<IS_PLL> = {
  ReqI: 0,
  PLID: 2,
};

const buffer = Buffer.from([
  size / AbstractPacket.SIZE_MULTIPLIER, // Size
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
