import type { PacketTestData } from '../../utils/tests';
import { testInfoPacket } from '../../utils/tests';
import { IS_SLC, PacketType } from '..';
import { Packet } from '../base';

const size = 8;

describe('IS_SLC', () => {
  describe('official car', () => {
    const officialCarData: PacketTestData<IS_SLC> = {
      ReqI: 3,
      UCID: 2,
      CName: 'XRT',
    };

    const officialCarBuffer = Buffer.from([
      size / Packet.SIZE_MULTIPLIER, // Size
      62, // Type
      3, // ReqI
      2, // UCID
      88, // CName (1)
      82, // CName (2)
      84, // CName (3)
      0, // CName (4)
    ]);

    testInfoPacket({
      packetClass: IS_SLC,
      type: PacketType.ISP_SLC,
      size,
      data: officialCarData,
      buffer: officialCarBuffer,
    });
  });

  describe('car mod', () => {
    const modData: PacketTestData<IS_SLC> = {
      ReqI: 3,
      UCID: 2,
      CName: '5882E6',
    };

    const modBuffer = Buffer.from([
      size / Packet.SIZE_MULTIPLIER, // Size
      62, // Type
      3, // ReqI
      2, // UCID
      230, // CName (1)
      130, // CName (2)
      88, // CName (3)
      0, // CName (4)
    ]);

    testInfoPacket({
      packetClass: IS_SLC,
      type: PacketType.ISP_SLC,
      size,
      data: modData,
      buffer: modBuffer,
    });
  });
});
