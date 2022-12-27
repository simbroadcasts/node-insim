import { stringToBytes } from '../../utils';
import { IS_VER, PacketType } from '..';
import { BasePacket } from '../BasePacket';

describe('IS_VER', () => {
  it('should unpack data from a buffer', () => {
    const buffer = Buffer.from([
      20 / BasePacket.SIZE_MULTIPLIER, // Size
      2, // Type
      1, // ReqI
      0, // Zero
      ...stringToBytes('0.7A'), // Version[8]
      0,
      0,
      0,
      0,
      ...stringToBytes('S3'), // Product[6]
      0,
      0,
      0,
      0,
      9, // InSimVer
      0, // Spare
    ]);
    const packet = new IS_VER().unpack(buffer);

    expect(packet.Size).toEqual(20);
    expect(packet.Type).toEqual(PacketType.ISP_VER);
    expect(packet.ReqI).toEqual(1);
    expect(packet.Zero).toEqual(0);
    expect(packet.Version).toEqual('0.7A');
    expect(packet.Product).toEqual('S3');
    expect(packet.InSimVer).toEqual(9);
    expect(packet.Spare).toEqual(0);
  });
});
