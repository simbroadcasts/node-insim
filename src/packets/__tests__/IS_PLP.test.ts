import { IS_PLP, PacketType } from '..';
import { AbstractPacket } from '../AbstractPacket';

describe('IS_PLP', () => {
  it('should unpack data from a buffer', () => {
    const buffer = Buffer.from([
      4 / AbstractPacket.SIZE_MULTIPLIER, // Size
      22, // Type
      1, // ReqI
      2, // PLID
    ]);
    const packet = new IS_PLP().unpack(buffer);

    expect(packet.Size).toEqual(4);
    expect(packet.Type).toEqual(PacketType.ISP_PLP);
    expect(packet.ReqI).toEqual(1);
    expect(packet.PLID).toEqual(2);
  });
});
