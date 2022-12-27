import type { PacketTestData } from '../../utils/tests';
import { testInfoPacket } from '../../utils/tests';
import { IS_NCI, Language, PacketType } from '..';
import { AbstractPacket } from '../base';

const size = 16;

const data: PacketTestData<IS_NCI> = {
  ReqI: 1,
  UCID: 3,
  Language: Language.LFS_CZECH,
  UserID: 17115651,
  IPAddress: '12.34.56.78',
};

const buffer = Buffer.from([
  size / AbstractPacket.SIZE_MULTIPLIER, // Size
  57, // Type
  1, // ReqI
  3, // UCID
  12, // Language
  0, // Sp1,
  0, // Sp2,
  0, // Sp3,
  3, // UserID (1)
  42, // UserID (2)
  5, // UserID (3)
  1, // UserID (4)
  12, // IPAddress (1)
  34, // IPAddress (2)
  56, // IPAddress (3)
  78, // IPAddress (4)
]);

describe('IS_NCI', () => {
  testInfoPacket({
    packetClass: IS_NCI,
    type: PacketType.ISP_NCI,
    size,
    data,
    buffer,
  });
});
