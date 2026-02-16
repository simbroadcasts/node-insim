import { PacketType } from '../enums/index.js';
import type { PacketTestData } from '../tests';
import { stringToBytes, testInfoPacket } from '../tests';
import { ConnectionFlags, IS_NCN } from './IS_NCN.js';

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
};

const buffer = new Uint8Array([
  size / new IS_NCN().SIZE_MULTIPLIER, // Size
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
