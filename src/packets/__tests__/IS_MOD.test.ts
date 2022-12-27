import { testSendablePacket } from '../../utils';
import type { IS_MOD_Data } from '..';
import { IS_MOD, PacketType } from '..';
import { BasePacket } from '../BasePacket';

const data: IS_MOD_Data = {
  Bits16: 2,
  RR: 59,
  Width: 1920,
  Height: 1080,
};

const expectedBuffer = Buffer.from([
  20 / BasePacket.SIZE_MULTIPLIER, // Size
  15, // Type
  0, // ReqI
  0, // Zero
  2, // Bits16 (1)
  0, // Bits16 (2)
  0, // Bits16 (3)
  0, // Bits16 (4)
  59, // RR (1)
  0, // RR (2)
  0, // RR (3)
  0, // RR (4)
  128, // Width (1)
  7, // Width (2)
  0, // Width (3)
  0, // Width (4)
  56, // Height (1)
  4, // Height (2)
  0, // Height (3)
  0, // Height (4)
]);

describe('IS_MOD', () => {
  testSendablePacket(IS_MOD, 20, PacketType.ISP_MOD, data, expectedBuffer);
});
