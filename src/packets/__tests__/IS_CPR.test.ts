import { stringToBytes } from '../../utils';
import { IS_CPR, PacketType } from '..';
import { BasePacket } from '../BasePacket';

describe('IS_CPR', () => {
  it('should unpack data from a buffer', () => {
    const buffer = Buffer.from([
      36 / BasePacket.SIZE_MULTIPLIER, // Size
      PacketType.ISP_CPR, // Type
      0, // ReqI
      3, // UCID
      ...stringToBytes('123456789 123456789 user'), // UName[24]
      ...stringToBytes('12345678'), // Plate[8]
    ]);
    const packet = new IS_CPR(buffer);

    expect(packet.Size).toEqual(36);
    expect(packet.Type).toEqual(PacketType.ISP_CPR);
    expect(packet.ReqI).toEqual(0);
    expect(packet.UCID).toEqual(3);
    expect(packet.PName).toEqual('123456789 123456789 user');
    expect(packet.Plate).toEqual('12345678');
  });
});
