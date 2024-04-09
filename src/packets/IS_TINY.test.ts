import { testBothWaysPacket } from '../tests';
import { PacketType, TinyType } from './enums';
import type { IS_TINY_Data } from './IS_TINY';
import { IS_TINY } from './IS_TINY';

const size = 4;

const data: IS_TINY_Data = {
  ReqI: 1,
  SubT: TinyType.TINY_PING,
};

const buffer = new Uint8Array([
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
