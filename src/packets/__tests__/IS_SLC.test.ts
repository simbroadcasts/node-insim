import type { PacketTestData } from '../../utils/tests';
import { testInfoPacket } from '../../utils/tests';
import { IS_SLC, PacketType } from '..';

const size = 8;

describe('IS_SLC', () => {
  describe('official car', () => {
    const data: PacketTestData<IS_SLC> = {
      ReqI: 3,
      UCID: 2,
      CName: 'XRT',
    };

    const buffer = Buffer.from([
      size / new IS_SLC().SIZE_MULTIPLIER, // Size
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
      data,
      buffer,
    });
  });

  describe('car mod', () => {
    const data: PacketTestData<IS_SLC> = {
      ReqI: 3,
      UCID: 2,
      CName: '5882E6',
    };

    const buffer = Buffer.from([
      size / new IS_SLC().SIZE_MULTIPLIER, // Size
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
      data,
      buffer,
    });
  });
});
