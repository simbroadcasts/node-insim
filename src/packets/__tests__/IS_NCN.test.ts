import { stringToBytes } from '../../utils';
import { ConnectionFlags, IS_NCN, PacketType } from '..';
import { AbstractPacket } from '../AbstractPacket';

describe('IS_NCN', () => {
  it('should unpack data from a buffer', () => {
    const buffer = Buffer.from([
      56 / AbstractPacket.SIZE_MULTIPLIER, // Size
      18, // Type
      2, // ReqI
      3, // UCID
      ...stringToBytes('123456789 123456789 user'), // UName[24]
      ...stringToBytes('123456789 123456789 play'), // PName[24]
      1, // Admin
      14, // Total
      4, // Flags
      0, // Sp3
    ]);
    const packet = new IS_NCN().unpack(buffer);

    expect(packet.Size).toEqual(56);
    expect(packet.Type).toEqual(PacketType.ISP_NCN);
    expect(packet.ReqI).toEqual(2);
    expect(packet.UCID).toEqual(3);
    expect(packet.UName).toEqual('123456789 123456789 user');
    expect(packet.PName).toEqual('123456789 123456789 play');
    expect(packet.Admin).toEqual(1);
    expect(packet.Total).toEqual(14);
    expect(packet.Flags).toEqual(ConnectionFlags.REMOTE);
    expect(packet.Sp3).toEqual(0);
  });
});
