import { BasePacket } from '../BasePacket';
import { IS_VER } from '../IS_VER';
import { PacketType } from '../packetTypes';

describe('IS_VER', () => {
  it('should unpack data from a buffer', () => {
    const buffer = Buffer.from([
      20 / BasePacket.SIZE_MULTIPLIER, // Size
      PacketType.ISP_VER, // Type
      1, // ReqI
      0, // Zero
      '0'.charCodeAt(0), // Version[8]
      '.'.charCodeAt(0),
      '7'.charCodeAt(0),
      'A'.charCodeAt(0),
      0,
      0,
      0,
      0,
      'S'.charCodeAt(0), // Product[6]
      '3'.charCodeAt(0),
      0,
      0,
      0,
      0,
      9, // InSimVer
      0, // Spare
    ]);
    const packet = new IS_VER(buffer);

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
