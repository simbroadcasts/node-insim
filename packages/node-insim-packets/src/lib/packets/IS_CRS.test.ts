import { PacketType } from '../enums/PacketType.js';
import type { PacketTestData } from '../tests.js';
import { testInfoPacket } from '../tests.js';
import { IS_CRS } from './IS_CRS.js';

const size = 4;

const data: PacketTestData<IS_CRS> = {
  ReqI: 0,
  PLID: 2,
};

const buffer = new Uint8Array([
  size / new IS_CRS().SIZE_MULTIPLIER, // Size
  41, // Type
  0, // ReqI
  2, // PLID
]);

describe('IS_CRS', () => {
  testInfoPacket({
    packetClass: IS_CRS,
    size,
    type: PacketType.ISP_CRS,
    data,
    buffer,
  });
});
