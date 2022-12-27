import type { PacketTestData } from '../../utils/tests';
import { testInfoPacket } from '../../utils/tests';
import { AdminCommandResult, IS_ACR, PacketType } from '..';
import { AbstractPacket } from '../base';

const size = 16;

const data: PacketTestData<IS_ACR> = {
  ReqI: 0,
  Zero: 0,
  UCID: 2,
  Admin: 1,
  Result: AdminCommandResult.PROCESSED,
  Text: '/laps 2',
};

const buffer = Buffer.from([
  size / AbstractPacket.SIZE_MULTIPLIER, // Size
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
