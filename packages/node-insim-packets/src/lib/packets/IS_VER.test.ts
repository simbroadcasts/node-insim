import { PacketType } from '../enums/index.js';
import type { PacketTestData } from '../tests';
import { stringToBytes, testInfoPacket } from '../tests';
import { IS_VER } from './IS_VER.js';

const size = 20;

const data: PacketTestData<IS_VER> = {
  ReqI: 1,
  Zero: 0,
  Version: '0.7A',
  Product: 'S3',
  InSimVer: 9,
};

const buffer = new Uint8Array([
  size / new IS_VER().SIZE_MULTIPLIER, // Size
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
