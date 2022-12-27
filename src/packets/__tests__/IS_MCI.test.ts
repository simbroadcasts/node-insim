import { CompCarFlags, IS_MCI, PacketType } from '..';
import { AbstractPacket } from '../AbstractPacket';

describe('IS_MCI', () => {
  it('should unpack data from a buffer', () => {
    const buffer = Buffer.from([
      4 / AbstractPacket.SIZE_MULTIPLIER, // Size
      38, // Type
      0, // ReqI
      2, // NumC
      57, // Info[0] - Node (1)
      0, // Info[0] - Node (2)
      1, // Info[0] - Lap (1)
      0, // Info[0] - Lap (1)
      17, // Info[0] - PLID
      1, // Info[0] - Position
      64, // Info[0] - Info
      0, // Info[0] - Sp3
      107, // Info[0] - X (1)
      112, // Info[0] - X (2)
      252, // Info[0] - X (3)
      0, // Info[0] - X (4)
      142, // Info[0] - Y (1)
      220, // Info[0] - Y (2)
      71, // Info[0] - Y (3)
      0, // Info[0] - Y (4)
      18, // Info[0] - Z (1)
      223, // Info[0] - Z (2)
      3, // Info[0] - Z (3)
      0, // Info[0] - Z (4)
      147, // Info[0] - Speed (1)
      14, // Info[0] - Speed (2)
      254, // Info[0] - Direction (1)
      222, // Info[0] - Direction (2)
      16, // Info[0] - Heading (1)
      223, // Info[0] - Heading (2)
      192, // Info[0] - AngVel (1)
      255, // Info[0] - AngVel (2)
      60, // Info[1] - Node (1)
      0, // Info[1] - Node (2)
      1, // Info[1] - Lap (1)
      0, // Info[1] - Lap (1)
      18, // Info[1] - PLID
      2, // Info[1] - Position
      128, // Info[1] - Info
      0, // Info[1] - Sp3
      193, // Info[1] - X (1)
      48, // Info[1] - X (2)
      14, // Info[1] - X (3)
      1, // Info[1] - X (4)
      237, // Info[1] - Y (1)
      94, // Info[1] - Y (2)
      81, // Info[1] - Y (3)
      0, // Info[1] - Y (4)
      211, // Info[1] - Z (1)
      131, // Info[1] - Z (2)
      3, // Info[1] - Z (3)
      0, // Info[1] - Z (4)
      224, // Info[1] - Speed (1)
      17, // Info[1] - Speed (2)
      36, // Info[1] - Direction (1)
      220, // Info[1] - Direction (2)
      250, // Info[1] - Heading (1)
      219, // Info[1] - Heading (2)
      71, // Info[1] - AngVel (1)
      0, // Info[1] - AngVel (2)
    ]);
    const packet = new IS_MCI().unpack(buffer);

    expect(packet.Size).toEqual(4);
    expect(packet.Type).toEqual(PacketType.ISP_MCI);
    expect(packet.ReqI).toEqual(0);
    expect(packet.NumC).toEqual(2);
    expect(packet.Info).toHaveLength(2);
    expect(packet.Info[0].Node).toEqual(57);
    expect(packet.Info[0].Lap).toEqual(1);
    expect(packet.Info[0].PLID).toEqual(17);
    expect(packet.Info[0].Position).toEqual(1);
    expect(packet.Info[0].Info).toEqual(CompCarFlags.CCI_FIRST);
    expect(packet.Info[0].Sp3).toEqual(0);
    expect(packet.Info[0].X).toEqual(16543851);
    expect(packet.Info[0].Y).toEqual(4709518);
    expect(packet.Info[0].Z).toEqual(253714);
    expect(packet.Info[0].Speed).toEqual(3731);
    expect(packet.Info[0].Direction).toEqual(57086);
    expect(packet.Info[0].Heading).toEqual(57104);
    expect(packet.Info[0].AngVel).toEqual(-64);
    expect(packet.Info[1].Node).toEqual(60);
    expect(packet.Info[1].Lap).toEqual(1);
    expect(packet.Info[1].PLID).toEqual(18);
    expect(packet.Info[1].Position).toEqual(2);
    expect(packet.Info[1].Info).toEqual(CompCarFlags.CCI_LAST);
    expect(packet.Info[1].Sp3).toEqual(0);
    expect(packet.Info[1].X).toEqual(17707201);
    expect(packet.Info[1].Y).toEqual(5332717);
    expect(packet.Info[1].Z).toEqual(230355);
    expect(packet.Info[1].Speed).toEqual(4576);
    expect(packet.Info[1].Direction).toEqual(56356);
    expect(packet.Info[1].Heading).toEqual(56314);
    expect(packet.Info[1].AngVel).toEqual(71);
  });
});
