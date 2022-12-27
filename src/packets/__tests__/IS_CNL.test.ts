import { IS_CNL, LeaveReason, PacketType } from '..';
import { AbstractPacket } from '../AbstractPacket';

describe('IS_CNL', () => {
  it('should unpack data from a buffer', () => {
    const buffer = Buffer.from([
      8 / AbstractPacket.SIZE_MULTIPLIER, // Size
      19, // Type
      0, // ReqI
      4, // UCID
      3, // Reason
      14, // Total
      0, // Sp2
      0, // Sp3
    ]);
    const packet = new IS_CNL().unpack(buffer);

    expect(packet.Size).toEqual(8);
    expect(packet.Type).toEqual(PacketType.ISP_CNL);
    expect(packet.ReqI).toEqual(0);
    expect(packet.UCID).toEqual(4);
    expect(packet.Reason).toEqual(LeaveReason.LEAVR_KICKED);
    expect(packet.Total).toEqual(14);
    expect(packet.Sp2).toEqual(0);
    expect(packet.Sp3).toEqual(0);
  });
});
