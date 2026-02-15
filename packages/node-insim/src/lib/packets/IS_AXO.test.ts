import type { PacketTestData } from '../tests';
import { testInfoPacket } from '../tests';
import { PacketType } from './enums';
import { IS_AXO } from './IS_AXO';

const size = 4;

const data: PacketTestData<IS_AXO> = {
  PLID: 3,
};

const buffer = new Uint8Array([
  size / new IS_AXO().SIZE_MULTIPLIER, // Size
  44, // Type
  0, // ReqI
  3, // PLID
]);

describe('IS_AXO', () => {
  testInfoPacket({
    packetClass: IS_AXO,
    type: PacketType.ISP_AXO,
    size,
    data,
    buffer,
  });
});
