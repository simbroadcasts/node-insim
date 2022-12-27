import type { PacketTestData } from '../../utils/tests';
import { stringToBytes, testInfoPacket } from '../../utils/tests';
import { IS_VER, PacketType } from '..';
import { AbstractPacket } from '../AbstractPacket';

const size = 20;

const data: PacketTestData<IS_VER> = {
  ReqI: 1,
  Zero: 0,
  Version: '0.7A',
  Product: 'S3',
  InSimVer: 9,
  Spare: 0,
};

const buffer = Buffer.from([
  size / AbstractPacket.SIZE_MULTIPLIER, // Size
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

describe('IS_VER', () => {
  testInfoPacket({
    packetClass: IS_VER,
    size,
    type: PacketType.ISP_VER,
    data,
    buffer,
  });
});
