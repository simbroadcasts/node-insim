import type { PacketTestData } from '../tests';
import { testInfoPacket } from '../tests';
import { PacketType } from './enums';
import { IS_PLP } from './IS_PLP';

const size = 4;

const data: PacketTestData<IS_PLP> = {
  ReqI: 0,
  PLID: 2,
};

const buffer = new Uint8Array([
  size / new IS_PLP().SIZE_MULTIPLIER, // Size
  22, // Type
  0, // ReqI
  2, // PLID
]);

describe('IS_PLP', () => {
  testInfoPacket({
    packetClass: IS_PLP,
    size,
    type: PacketType.ISP_PLP,
    data,
    buffer,
  });
});
