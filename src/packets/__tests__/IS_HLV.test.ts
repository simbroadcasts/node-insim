import { HlvcViolation, IS_HLV, PacketType } from '..';
import { AbstractPacket } from '../AbstractPacket';

const expectedBuffer = Buffer.from([
  16 / AbstractPacket.SIZE_MULTIPLIER, // Size
  52, // Type
  0, // ReqI
  3, // PLID
  1, // HLVC
  0, // Sp1
  202, // C - Time (1)
  7, // C - Time (1)
  2, // C - Direction
  231, // C - Heading
  4, // C - Speed
  14, // C - Zbyte
  217, // C - X (1)
  16, // C - X (2)
  153, // C - Y (1)
  5, // C - Y (2)
]);

describe('IS_HLV', () => {
  it('should unpack data from a buffer', () => {
    const packet = new IS_HLV().unpack(expectedBuffer);

    expect(packet.Size).toEqual(16);
    expect(packet.Type).toEqual(PacketType.ISP_HLV);
    expect(packet.ReqI).toEqual(0);
    expect(packet.PLID).toEqual(3);
    expect(packet.HLVC).toEqual(HlvcViolation.WALL);
    expect(packet.Sp1).toEqual(0);
    expect(packet.Time).toEqual(1994);
    expect(packet.C.Direction).toEqual(2);
    expect(packet.C.Heading).toEqual(231);
    expect(packet.C.Speed).toEqual(4);
    expect(packet.C.Zbyte).toEqual(14);
    expect(packet.C.X).toEqual(4313);
    expect(packet.C.Y).toEqual(1433);
  });
});
