import { ConfirmationFlags, IS_FIN, PacketType, PlayerFlags } from '..';
import { AbstractPacket } from '../AbstractPacket';

describe('IS_FIN', () => {
  it('should unpack data from a buffer', () => {
    const buffer = Buffer.from([
      20 / AbstractPacket.SIZE_MULTIPLIER, // Size
      34, // Type
      0, // ReqI
      3, // PLID
      145, // TTime (1)
      4, // TTime (2)
      2, // TTime (3)
      0, // TTime (4)
      65, // BTime (1)
      56, // BTime (2)
      0, // BTime (3)
      0, // BTime (4)
      0, // SpA
      1, // NumStops
      22, // Confirm
      0, // SpB
      68, // LapsDone (1)
      0, // LapsDone (2)
      9, // Flags (1)
      0, // Flags (2)
    ]);
    const packet = new IS_FIN().unpack(buffer);

    expect(packet.Size).toEqual(20);
    expect(packet.Type).toEqual(PacketType.ISP_FIN);
    expect(packet.ReqI).toEqual(0);
    expect(packet.PLID).toEqual(3);
    expect(packet.TTime).toEqual(132241);
    expect(packet.BTime).toEqual(14401);
    expect(packet.SpA).toEqual(0);
    expect(packet.NumStops).toEqual(1);
    expect(packet.Confirm).toEqual(
      ConfirmationFlags.CONF_CONFIRMED |
        ConfirmationFlags.CONF_PENALTY_DT |
        ConfirmationFlags.CONF_PENALTY_30,
    );
    expect(packet.SpB).toEqual(0);
    expect(packet.LapsDone).toEqual(68);
    expect(packet.Flags).toEqual(
      PlayerFlags.PIF_AUTOGEARS | PlayerFlags.PIF_LEFTSIDE,
    );
  });
});
