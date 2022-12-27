import { IS_OBH, ObjectHitFlags, PacketType } from '..';
import { AbstractPacket } from '../AbstractPacket';

const expectedBuffer = Buffer.from([
  24 / AbstractPacket.SIZE_MULTIPLIER, // Size
  51, // Type
  0, // ReqI
  3, // PLID
  23, // SpClose (1)
  0, // SpClose (2)
  241, // Time (1)
  1, // Time (2)
  2, // C - Direction
  254, // C - Heading
  3, // C - Speed
  9, // C - Zbyte
  4, // C - X (1)
  213, // C - X (2)
  132, // C - Y (1)
  134, // C - Y (2)
  18, // X (1)
  213, // X (2)
  174, // Y (1)
  134, // Y (2)
  1, // Zbyte
  0, // Sp1
  168, // Index
  11, // OBHFlags
]);

describe('IS_OBH', () => {
  it('should unpack data from a buffer', () => {
    const packet = new IS_OBH().unpack(expectedBuffer);

    expect(packet.Size).toEqual(24);
    expect(packet.Type).toEqual(PacketType.ISP_OBH);
    expect(packet.ReqI).toEqual(0);
    expect(packet.PLID).toEqual(3);
    expect(packet.SpClose).toEqual(23);
    expect(packet.Time).toEqual(497);
    expect(packet.C.Direction).toEqual(2);
    expect(packet.C.Heading).toEqual(254);
    expect(packet.C.Speed).toEqual(3);
    expect(packet.C.Zbyte).toEqual(9);
    expect(packet.C.X).toEqual(-11004);
    expect(packet.C.Y).toEqual(-31100);
    expect(packet.X).toEqual(-10990);
    expect(packet.Y).toEqual(-31058);
    expect(packet.Zbyte).toEqual(1);
    expect(packet.Sp1).toEqual(0);
    expect(packet.Index).toEqual(168);
    expect(packet.OBHFlags).toEqual(
      ObjectHitFlags.OBH_LAYOUT |
        ObjectHitFlags.OBH_CAN_MOVE |
        ObjectHitFlags.OBH_ON_SPOT,
    );
  });
});
