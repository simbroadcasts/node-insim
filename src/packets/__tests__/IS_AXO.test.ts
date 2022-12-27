import type { PacketTestData } from '../../utils';
import { testInfoPacket } from '../../utils';
import { IS_AXO, PacketType } from '..';
import { AbstractPacket } from '../AbstractPacket';

const data: PacketTestData<IS_AXO> = {
  PLID: 3,
};

const buffer = Buffer.from([
  4 / AbstractPacket.SIZE_MULTIPLIER, // Size
  44, // Type
  0, // ReqI
  3, // PLID
]);

describe('IS_AXO', () => {
  testInfoPacket({
    packetClass: IS_AXO,
    type: PacketType.ISP_AXO,
    size: 4,
    data,
    buffer,
  });
});
