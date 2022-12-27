import { IS_SPX, PacketType, PenaltyValue } from '..';
import { BasePacket } from '../BasePacket';

describe('IS_SPX', () => {
  it('should unpack data from a buffer', () => {
    const buffer = Buffer.from([
      20 / BasePacket.SIZE_MULTIPLIER, // Size
      25, // Type
      0, // ReqI
      2, // PLID
      4, // STime (1)
      0, // STime (2)
      0, // STime (3)
      1, // STime (4)
      64, // ETime (1)
      0, // ETime (2)
      1, // ETime (3)
      0, // ETime (4)
      3, // Split
      6, // Penalty
      3, // NumStops
      40, // Fuel200
    ]);
    const packet = new IS_SPX().unpack(buffer);

    expect(packet.Size).toEqual(20);
    expect(packet.Type).toEqual(PacketType.ISP_SPX);
    expect(packet.ReqI).toEqual(0);
    expect(packet.PLID).toEqual(2);
    expect(packet.STime).toEqual(16777220);
    expect(packet.ETime).toEqual(65600);
    expect(packet.Split).toEqual(3);
    expect(packet.Penalty).toEqual(PenaltyValue.PENALTY_45);
    expect(packet.NumStops).toEqual(3);
    expect(packet.Fuel200).toEqual(40);
  });
});
