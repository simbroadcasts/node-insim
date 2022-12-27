import { stringToBytes } from '../../utils';
import { IS_III, PacketType } from '..';
import { BasePacket } from '../BasePacket';

describe('IS_III', () => {
  it('should unpack data from a buffer', () => {
    const msg =
      'This string is a very long text sixty four characters long yes.';
    const buffer = Buffer.from([
      72 / BasePacket.SIZE_MULTIPLIER, // Size
      PacketType.ISP_III, // Type
      1, // ReqI
      0, // Zero
      2, // UCID
      4, // PLID
      0, // Sp2
      0, // Sp3
      ...stringToBytes(msg), // Msg[64]
      0,
    ]);
    const packet = new IS_III().unpack(buffer);

    expect(packet.Size).toEqual(72);
    expect(packet.Type).toEqual(PacketType.ISP_III);
    expect(packet.ReqI).toEqual(1);
    expect(packet.Zero).toEqual(0);
    expect(packet.UCID).toEqual(2);
    expect(packet.PLID).toEqual(4);
    expect(packet.Msg).toEqual(msg);
  });
});
