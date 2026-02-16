import { PacketType } from '../enums/PacketType.js';
import type { PacketTestData } from '../tests.js';
import { testInfoPacket } from '../tests.js';
import { AdminCommandResult, IS_ACR } from './IS_ACR.js';

const size = 16;

const data: PacketTestData<IS_ACR> = {
  ReqI: 0,
  Zero: 0,
  UCID: 2,
  Admin: 1,
  Result: AdminCommandResult.PROCESSED,
  Text: '/laps 2',
};

const buffer = new Uint8Array([
  size / new IS_ACR().SIZE_MULTIPLIER, // Size
  55, // Type
  0, // ReqI
  0, // Zero
  2, // UCID
  1, // Admin
  1, // Result
  0, // Sp3
  47, // Text[64]
  108,
  97,
  112,
  115,
  32,
  50,
  0,
]);

describe('IS_ACR', () => {
  testInfoPacket({
    packetClass: IS_ACR,
    type: PacketType.ISP_ACR,
    size,
    data,
    buffer,
  });
});
