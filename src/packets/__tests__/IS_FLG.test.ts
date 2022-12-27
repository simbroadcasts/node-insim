import { FlagType, IS_FLG, PacketType } from '..';
import { BasePacket } from '../BasePacket';

describe('IS_FLG', () => {
  it('should unpack data from a buffer', () => {
    const buffer = Buffer.from([
      8 / BasePacket.SIZE_MULTIPLIER, // Size
      32, // Type
      0, // ReqI
      3, // PLID
      1, // OffOn
      2, // Flag
      14, // CarBehind
      0, // Sp3
    ]);
    const packet = new IS_FLG().unpack(buffer);

    expect(packet.Size).toEqual(8);
    expect(packet.Type).toEqual(PacketType.ISP_FLG);
    expect(packet.ReqI).toEqual(0);
    expect(packet.PLID).toEqual(3);
    expect(packet.OffOn).toEqual(1);
    expect(packet.Flag).toEqual(FlagType.YELLOW);
    expect(packet.CarBehind).toEqual(14);
    expect(packet.Sp3).toEqual(0);
  });
});
