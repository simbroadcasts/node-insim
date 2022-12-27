import { IS_PSF, PacketType } from '..';
import { BasePacket } from '../BasePacket';

describe('IS_PSF', () => {
  it('should unpack data from a buffer', () => {
    const buffer = Buffer.from([
      12 / BasePacket.SIZE_MULTIPLIER, // Size
      27, // Type
      0, // ReqI
      2, // PLID
      345, // STime (1)
      2, // STime (2)
      3, // STime (3)
      1, // STime (4)
      0, // Spare (1)
      0, // Spare (2)
      0, // Spare (3)
      0, // Spare (4)
    ]);
    const packet = new IS_PSF().unpack(buffer);

    expect(packet.Size).toEqual(12);
    expect(packet.Type).toEqual(PacketType.ISP_PSF);
    expect(packet.ReqI).toEqual(0);
    expect(packet.PLID).toEqual(2);
    expect(packet.STime).toEqual(16974425);
    expect(packet.Spare).toEqual(0);
  });
});
