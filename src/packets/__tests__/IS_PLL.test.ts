import { IS_PLL, PacketType } from '..';
import { BasePacket } from '../BasePacket';

describe('IS_PLL', () => {
  it('should unpack data from a buffer', () => {
    const buffer = Buffer.from([
      4 / BasePacket.SIZE_MULTIPLIER, // Size
      PacketType.ISP_PLL, // Type
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
