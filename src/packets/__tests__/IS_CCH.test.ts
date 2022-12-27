import { IS_CCH, PacketType, ViewIdentifier } from '..';
import { AbstractPacket } from '../AbstractPacket';

describe('IS_CCH', () => {
  it('should unpack data from a buffer', () => {
    const buffer = Buffer.from([
      8 / AbstractPacket.SIZE_MULTIPLIER, // Size
      29, // Type
      0, // ReqI
      3, // PLID
      4, // Camera
      0, // Sp1
      0, // Sp2
      0, // Sp3
    ]);
    const packet = new IS_CCH().unpack(buffer);

    expect(packet.Size).toEqual(8);
    expect(packet.Type).toEqual(PacketType.ISP_CCH);
    expect(packet.ReqI).toEqual(0);
    expect(packet.PLID).toEqual(3);
    expect(packet.Camera).toEqual(ViewIdentifier.VIEW_CUSTOM);
    expect(packet.Sp1).toEqual(0);
    expect(packet.Sp2).toEqual(0);
    expect(packet.Sp3).toEqual(0);
  });
});
