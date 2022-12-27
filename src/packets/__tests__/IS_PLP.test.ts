import type { PacketTestData } from '../../utils';
import { testInfoPacket } from '../../utils';
import { IS_PLP, PacketType } from '..';
import { AbstractPacket } from '../AbstractPacket';

const size = 4;

const data: PacketTestData<IS_PLP> = {
  ReqI: 0,
  PLID: 2,
};

const buffer = Buffer.from([
  size / AbstractPacket.SIZE_MULTIPLIER, // Size
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
