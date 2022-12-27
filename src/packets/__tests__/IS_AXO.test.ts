import type { PacketTestData } from '../../utils/tests';
import { testInfoPacket } from '../../utils/tests';
import { IS_AXO, PacketType } from '..';
import { AbstractPacket } from '../base';

const size = 4;

const data: PacketTestData<IS_AXO> = {
  PLID: 3,
};

const buffer = Buffer.from([
  size / AbstractPacket.SIZE_MULTIPLIER, // Size
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
