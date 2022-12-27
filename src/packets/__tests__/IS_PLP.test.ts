import type { PacketTestData } from '../../utils/tests';
import { testInfoPacket } from '../../utils/tests';
import { IS_PLP, PacketType } from '..';
import { Packet } from '../base';

const size = 4;

const data: PacketTestData<IS_PLP> = {
  ReqI: 0,
  PLID: 2,
};

const buffer = Buffer.from([
  size / Packet.SIZE_MULTIPLIER, // Size
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
