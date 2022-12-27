import { IS_PEN, PacketType, PenaltyReason, PenaltyValue } from '..';
import { AbstractPacket } from '../AbstractPacket';

describe('IS_PEN', () => {
  it('should unpack data from a buffer', () => {
    const buffer = Buffer.from([
      8 / AbstractPacket.SIZE_MULTIPLIER, // Size
      30, // Type
      0, // ReqI
      3, // PLID
      1, // OldPen
      2, // NewPen
      4, // Reason
      0, // Sp3
    ]);
    const packet = new IS_PEN().unpack(buffer);

    expect(packet.Size).toEqual(8);
    expect(packet.Type).toEqual(PacketType.ISP_PEN);
    expect(packet.ReqI).toEqual(0);
    expect(packet.PLID).toEqual(3);
    expect(packet.OldPen).toEqual(PenaltyValue.PENALTY_DT);
    expect(packet.NewPen).toEqual(PenaltyValue.PENALTY_DT_VALID);
    expect(packet.Reason).toEqual(PenaltyReason.PENR_SPEEDING);
    expect(packet.Sp3).toEqual(0);
  });
});
