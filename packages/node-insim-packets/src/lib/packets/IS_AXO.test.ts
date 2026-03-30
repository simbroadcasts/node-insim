import { PacketType } from '../enums/PacketType.js';
import type { PacketTestData } from '../tests.js';
import { testInfoPacket } from '../tests.js';
import { IS_AXO } from './IS_AXO.js';

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
