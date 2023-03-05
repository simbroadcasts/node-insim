import { testBothWaysPacket } from '../../utils/tests';
import type { IS_TINY_Data } from '..';
import { IS_TINY, PacketType, TinyType } from '..';

const size = 4;

const data: IS_TINY_Data = {
  ReqI: 1,
  SubT: TinyType.TINY_PING,
};

const buffer = Buffer.from([
  size / new IS_TINY().SIZE_MULTIPLIER, // Size
  3, // Type
  1, // ReqI
  3, // SubT
]);

describe('IS_TINY', () => {
  testBothWaysPacket({
    packetClass: IS_TINY,
    size,
    type: PacketType.ISP_TINY,
    data,
    buffer,
  });
});
