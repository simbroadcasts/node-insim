import { IS_AXO, PacketType } from '..';
import { AbstractPacket } from '../AbstractPacket';

const expectedBuffer = Buffer.from([
  4 / AbstractPacket.SIZE_MULTIPLIER, // Size
  44, // Type
  0, // ReqI
  3, // PLID
]);

describe('IS_AXO', () => {
  it('should unpack data from a buffer', () => {
    const packet = new IS_AXO().unpack(expectedBuffer);

    expect(packet.Size).toEqual(4);
    expect(packet.Type).toEqual(PacketType.ISP_AXO);
    expect(packet.ReqI).toEqual(0);
    expect(packet.PLID).toEqual(3);
  });
});
