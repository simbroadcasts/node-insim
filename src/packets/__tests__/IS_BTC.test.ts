import { ButtonClickFlags, INST_ALWAYS_ON, IS_BTC, PacketType } from '..';
import { AbstractPacket } from '../AbstractPacket';

describe('IS_BTC', () => {
  it('should unpack data from a buffer', () => {
    const buffer = Buffer.from([
      8 / AbstractPacket.SIZE_MULTIPLIER, // Size
      46, // Type
      1, // ReqI
      2, // UCID
      3, // ClickID
      128, // Inst
      2, // CFlags
      0, // Sp3
    ]);
    const packet = new IS_BTC().unpack(buffer);

    expect(packet.Size).toEqual(8);
    expect(packet.Type).toEqual(PacketType.ISP_BTC);
    expect(packet.ReqI).toEqual(1);
    expect(packet.UCID).toEqual(2);
    expect(packet.ClickID).toEqual(3);
    expect(packet.Inst).toEqual(INST_ALWAYS_ON);
    expect(packet.CFlags).toEqual(ButtonClickFlags.ISB_RMB);
    expect(packet.Sp3).toEqual(0);
  });
});
