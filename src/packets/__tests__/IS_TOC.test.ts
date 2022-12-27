import { IS_TOC, PacketType } from '..';
import { BasePacket } from '../BasePacket';

describe('IS_TOC', () => {
  it('should unpack data from a buffer', () => {
    const buffer = Buffer.from([
      8 / BasePacket.SIZE_MULTIPLIER, // Size
      31, // Type
      0, // ReqI
      3, // PLID
      1, // OldUCID
      2, // NewUCID
      0, // Sp2
      0, // Sp3
    ]);
    const packet = new IS_TOC().unpack(buffer);

    expect(packet.Size).toEqual(8);
    expect(packet.Type).toEqual(PacketType.ISP_TOC);
    expect(packet.ReqI).toEqual(0);
    expect(packet.PLID).toEqual(3);
    expect(packet.OldUCID).toEqual(1);
    expect(packet.NewUCID).toEqual(2);
    expect(packet.Sp2).toEqual(0);
    expect(packet.Sp3).toEqual(0);
  });
});
