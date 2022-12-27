import { CarContactFlags, IS_CON, PacketType } from '..';
import { AbstractPacket } from '../AbstractPacket';

const expectedBuffer = Buffer.from([
  40 / AbstractPacket.SIZE_MULTIPLIER, // Size
  50, // Type
  0, // ReqI
  0, // Zero
  155, // SpClose (1)
  0, // SpClose (2)
  191, // Time (1)
  5, // Time (2)
  1, // A - PLID
  33, // A - Info
  0, // A - Sp2
  3, // A - Steer
  4, // A - ThrBrk
  2, // A - CluHan
  32, // A - GearSp
  26, // A - Speed
  202, // A - Direction
  196, // A - Heading
  255, // A - AccelF
  11, // A - AccelR
  245, // A - X (1)
  19, // A - X (2)
  188, // A - Y (1)
  6, // A - Y (2)
  2, // B - PLID
  34, // B - Info
  0, // B - Sp2
  5, // B - Steer
  112, // B - ThrBrk
  9, // B - CluHan
  32, // B - GearSp
  20, // B - Speed
  172, // B - Direction
  171, // B - Heading
  4, // B - AccelF
  12, // B - AccelR
  57, // B - X (1)
  20, // B - X (2)
  200, // B - Y (1)
  6, // B - Y (2)
]);

describe('IS_CON', () => {
  it('should unpack data from a buffer', () => {
    const packet = new IS_CON().unpack(expectedBuffer);

    expect(packet.Size).toEqual(40);
    expect(packet.Type).toEqual(PacketType.ISP_CON);
    expect(packet.ReqI).toEqual(0);
    expect(packet.Zero).toEqual(0);
    expect(packet.SpClose).toEqual(155);
    expect(packet.Time).toEqual(1471);
    expect(packet.A.PLID).toEqual(1);
    expect(packet.A.Info).toEqual(
      CarContactFlags.CCI_BLUE | CarContactFlags.CCI_LAG,
    );
    expect(packet.A.Sp2).toEqual(0);
    expect(packet.A.Steer).toEqual(3);
    expect(packet.A.ThrBrk).toEqual(4);
    expect(packet.A.CluHan).toEqual(2);
    expect(packet.A.GearSp).toEqual(32);
    expect(packet.A.Speed).toEqual(26);
    expect(packet.A.Direction).toEqual(202);
    expect(packet.A.Heading).toEqual(196);
    expect(packet.A.AccelF).toEqual(-1);
    expect(packet.A.AccelR).toEqual(11);
    expect(packet.A.X).toEqual(5109);
    expect(packet.A.Y).toEqual(1724);
    expect(packet.B.PLID).toEqual(2);
    expect(packet.B.Info).toEqual(
      CarContactFlags.CCI_YELLOW | CarContactFlags.CCI_LAG,
    );
    expect(packet.B.Sp2).toEqual(0);
    expect(packet.B.Steer).toEqual(5);
    expect(packet.B.ThrBrk).toEqual(112);
    expect(packet.B.CluHan).toEqual(9);
    expect(packet.B.GearSp).toEqual(32);
    expect(packet.B.Speed).toEqual(20);
    expect(packet.B.Direction).toEqual(172);
    expect(packet.B.Heading).toEqual(171);
    expect(packet.B.AccelF).toEqual(4);
    expect(packet.B.AccelR).toEqual(12);
    expect(packet.B.X).toEqual(5177);
    expect(packet.B.Y).toEqual(1736);
  });
});
