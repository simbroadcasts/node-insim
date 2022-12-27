import { IS_LAP, PacketType, PlayerFlags } from '..';
import { AbstractPacket } from '../AbstractPacket';
import { PenaltyValue } from '../enums';

describe('IS_LAP', () => {
  it('should unpack data from a buffer', () => {
    const buffer = Buffer.from([
      20 / AbstractPacket.SIZE_MULTIPLIER, // Size
      24, // Type
      0, // ReqI
      2, // PLID
      4, // LTime (1)
      0, // LTime (2)
      0, // LTime (3)
      1, // LTime (4)
      64, // ETime (1)
      0, // ETime (2)
      1, // ETime (3)
      0, // ETime (4)
      1, // LapsDone (1)
      2, // LapsDone (2)
      64, // Flags (1)
      2, // Flags (2)
      0, // Sp0
      6, // Penalty
      3, // NumStops
      40, // Fuel200
    ]);
    const packet = new IS_LAP().unpack(buffer);

    expect(packet.Size).toEqual(20);
    expect(packet.Type).toEqual(PacketType.ISP_LAP);
    expect(packet.ReqI).toEqual(0);
    expect(packet.PLID).toEqual(2);
    expect(packet.LTime).toEqual(16777220);
    expect(packet.ETime).toEqual(65600);
    expect(packet.LapsDone).toEqual(513);
    expect(packet.Flags).toEqual(
      PlayerFlags.PIF_AUTOCLUTCH | PlayerFlags.PIF_HELP_B,
    );
    expect(packet.Sp0).toEqual(0);
    expect(packet.Penalty).toEqual(PenaltyValue.PENALTY_45);
    expect(packet.NumStops).toEqual(3);
    expect(packet.Fuel200).toEqual(40);
  });
});
