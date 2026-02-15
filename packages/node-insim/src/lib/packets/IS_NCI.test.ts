import type { PacketTestData } from '../tests';
import { testInfoPacket } from '../tests';
import { PacketType } from './enums';
import { IS_NCI, Language, License } from './IS_NCI';

const size = 16;

const data: PacketTestData<IS_NCI> = {
  ReqI: 1,
  UCID: 3,
  Language: Language.LFS_CZECH,
  License: License.S3,
  UserID: 17115651,
  IPAddress: '12.34.56.78',
};

const buffer = new Uint8Array([
  size / new IS_NCI().SIZE_MULTIPLIER, // Size
  57, // Type
  1, // ReqI
  3, // UCID
  12, // Language
  3, // License,
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
