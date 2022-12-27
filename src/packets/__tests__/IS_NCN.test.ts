import type { PacketTestData } from '../../utils/tests';
import { stringToBytes, testInfoPacket } from '../../utils/tests';
import { ConnectionFlags, IS_NCN, PacketType } from '..';
import { AbstractPacket } from '../base';

const size = 56;

const uName = '123456789 123456789 user';
const pName = '123456789 123456789 play';

const data: PacketTestData<IS_NCN> = {
  ReqI: 2,
  UCID: 3,
  UName: uName,
  PName: pName,
  Admin: 1,
  Total: 14,
  Flags: ConnectionFlags.REMOTE,
  Sp3: 0,
};

const buffer = Buffer.from([
  size / AbstractPacket.SIZE_MULTIPLIER, // Size
  18, // Type
  2, // ReqI
  3, // UCID
  ...stringToBytes(uName), // UName[24]
  ...stringToBytes(pName), // PName[24]
  1, // Admin
  14, // Total
  4, // Flags
  0, // Sp3
]);

describe('IS_NCN', () => {
  testInfoPacket({
    packetClass: IS_NCN,
    size,
    type: PacketType.ISP_NCN,
    data,
    buffer,
  });
});
