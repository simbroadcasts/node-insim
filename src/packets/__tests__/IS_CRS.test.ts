import type { PacketTestData } from '../../utils/tests';
import { testInfoPacket } from '../../utils/tests';
import { IS_CRS, PacketType } from '..';
import { AbstractPacket } from '../AbstractPacket';

const size = 4;

const data: PacketTestData<IS_CRS> = {
  ReqI: 0,
  PLID: 2,
};

const buffer = Buffer.from([
  size / AbstractPacket.SIZE_MULTIPLIER, // Size
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
