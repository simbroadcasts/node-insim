import { IS_CRS, PacketType } from '..';
import { BasePacket } from '../BasePacket';

describe('IS_CRS', () => {
  it('should unpack data from a buffer', () => {
    const buffer = Buffer.from([
      4 / BasePacket.SIZE_MULTIPLIER, // Size
      41, // Type
      1, // ReqI
      2, // PLID
    ]);
    const packet = new IS_CRS().unpack(buffer);

    expect(packet.Size).toEqual(4);
    expect(packet.Type).toEqual(PacketType.ISP_CRS);
    expect(packet.ReqI).toEqual(1);
    expect(packet.PLID).toEqual(2);
  });
});
