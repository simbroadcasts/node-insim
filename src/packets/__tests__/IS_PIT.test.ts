import { IS_PIT, PacketType, PlayerFlags } from '..';
import { AbstractPacket } from '../AbstractPacket';

describe('IS_PIT', () => {
  it('should unpack data from a buffer', () => {
    const buffer = Buffer.from([
      24 / AbstractPacket.SIZE_MULTIPLIER, // Size
      26, // Type
      0, // ReqI
      1, // PLID
      25, // LapsDone (1)
      0, // LapsDone (2)
      73, // Flags (1)
      6, // Flags (2)
      30, // FuelAdd
      0, // Penalty
      1, // NumStops
      0, // Sp3
      255, // TyreRL
      255, // TyreRR
      255, // TyreFL
      255, // TyreFL
      2, // Work (1)
      0, // Work (2)
      2, // Work (3)
      0, // Work (4)
      0, // Spare (1)
      0, // Spare (1)
      0, // Spare (1)
      0, // Spare (1)
    ]);
    const packet = new IS_PIT().unpack(buffer);

    expect(packet.Size).toEqual(24);
    expect(packet.Type).toEqual(PacketType.ISP_PIT);
    expect(packet.ReqI).toEqual(0);
    expect(packet.PLID).toEqual(1);
    expect(packet.LapsDone).toEqual(25);
    expect(packet.Flags).toEqual(
      PlayerFlags.PIF_LEFTSIDE |
        PlayerFlags.PIF_AUTOGEARS |
        PlayerFlags.PIF_AUTOCLUTCH |
        PlayerFlags.PIF_HELP_B |
        PlayerFlags.PIF_MOUSE,
    );
  });
});
