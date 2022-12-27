import { IS_NLP, PacketType } from '..';
import { AbstractPacket } from '../AbstractPacket';

describe('IS_NLP', () => {
  it('should unpack data from a buffer', () => {
    const buffer = Buffer.from([
      40 / AbstractPacket.SIZE_MULTIPLIER, // Size
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
    expect(packet.Info).toHaveLength(2);
    expect(packet.Info[0].Node).toEqual(282);
    expect(packet.Info[0].Lap).toEqual(14);
    expect(packet.Info[0].PLID).toEqual(5);
    expect(packet.Info[0].Position).toEqual(18);
    expect(packet.Info[1].Node).toEqual(1315);
    expect(packet.Info[1].Lap).toEqual(13);
    expect(packet.Info[1].PLID).toEqual(6);
    expect(packet.Info[1].Position).toEqual(19);
  });
});
