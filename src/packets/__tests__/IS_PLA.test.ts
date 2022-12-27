import { IS_PLA, PacketType, PitLaneFact } from '..';
import { BasePacket } from '../BasePacket';

describe('IS_PLA', () => {
  it('should unpack data from a buffer', () => {
    const buffer = Buffer.from([
      8 / BasePacket.SIZE_MULTIPLIER, // Size
      28, // Type
      0, // ReqI
      3, // PLID
      4, // Fact
      0, // Sp1
      0, // Sp2
      0, // Sp3
    ]);
    const packet = new IS_PLA().unpack(buffer);

    expect(packet.Size).toEqual(8);
    expect(packet.Type).toEqual(PacketType.ISP_PLA);
    expect(packet.ReqI).toEqual(0);
    expect(packet.ReqI).toEqual(0);
    expect(packet.PLID).toEqual(3);
    expect(packet.Fact).toEqual(PitLaneFact.PITLANE_SG);
    expect(packet.Sp1).toEqual(0);
    expect(packet.Sp2).toEqual(0);
    expect(packet.Sp3).toEqual(0);
  });
});
