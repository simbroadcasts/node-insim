import { testSendablePacket } from '../../utils';
import type { IS_TINY_Data } from '..';
import { IS_TINY, PacketType, TinyType } from '..';
import { AbstractPacket } from '../AbstractPacket';

const data: IS_TINY_Data = {
  ReqI: 1,
  SubT: TinyType.TINY_CLOSE,
};

const buffer = Buffer.from([
  4 / AbstractPacket.SIZE_MULTIPLIER, // Size
  3, // Type
  1, // ReqI
  2, // SubT
]);

describe('IS_TINY', () => {
  testSendablePacket(IS_TINY, 4, PacketType.ISP_TINY, data, buffer);

  it('should unpack data from a buffer', () => {
    const packet = new IS_TINY().unpack(buffer);

    expect(packet.Size).toEqual(4);
    expect(packet.Type).toEqual(PacketType.ISP_TINY);
    expect(packet.ReqI).toEqual(1);
    expect(packet.SubT).toEqual(TinyType.TINY_CLOSE);
  });
});
