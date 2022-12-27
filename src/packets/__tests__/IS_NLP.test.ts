import { IS_NLP, PacketType } from '..';
import { BasePacket } from '../BasePacket';

describe('IS_NLP', () => {
  it('should unpack data from a buffer', () => {
    const buffer = Buffer.from([
      40 / BasePacket.SIZE_MULTIPLIER, // Size
      37, // Type
      1, // ReqI
      2, // NumP
      26, // Info[1] - Node (1)
      1, // Info[1] - Node (2)
      14, // Info[1] - Lap (1)
      0, // Info[1] - Lap (2)
      5, // Info[1] - PLID
      18, // Info[1] - Position
      35, // Info[2] - Node (1)
      5, // Info[2] - Node (2)
      13, // Info[2] - Lap (1)
      0, // Info[2] - Lap (2)
      6, // Info[2] - PLID
      19, // Info[2] - Position
    ]);
    const packet = new IS_NLP().unpack(buffer);

    expect(packet.Size).toEqual(40);
    expect(packet.Type).toEqual(PacketType.ISP_NLP);
    expect(packet.ReqI).toEqual(1);
    expect(packet.NumP).toEqual(2);
    expect(packet.Info).toEqual([
      {
        Node: 282,
        Lap: 14,
        PLID: 5,
        Position: 18,
      },
      {
        Node: 1315,
        Lap: 13,
        PLID: 6,
        Position: 19,
      },
    ]);
  });
});
