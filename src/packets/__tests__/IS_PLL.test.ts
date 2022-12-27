import { IS_PLL, PacketType } from '..';
import { AbstractPacket } from '../AbstractPacket';

describe('IS_PLL', () => {
  it('should unpack data from a buffer', () => {
    const buffer = Buffer.from([
      4 / AbstractPacket.SIZE_MULTIPLIER, // Size
      23, // Type
      1, // ReqI
      2, // PLID
    ]);
    const packet = new IS_PLL().unpack(buffer);

    expect(packet.Size).toEqual(4);
    expect(packet.Type).toEqual(PacketType.ISP_PLL);
    expect(packet.ReqI).toEqual(1);
    expect(packet.PLID).toEqual(2);
  });
});
