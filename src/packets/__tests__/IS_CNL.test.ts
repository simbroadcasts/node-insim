import type { PacketTestData } from '../../tests';
import { testInfoPacket } from '../../tests';
import { IS_CNL, LeaveReason, PacketType } from '..';

const size = 8;

const data: PacketTestData<IS_CNL> = {
  UCID: 4,
  Reason: LeaveReason.LEAVR_KICKED,
  Total: 14,
};

const buffer = new Uint8Array([
  size / new IS_CNL().SIZE_MULTIPLIER, // Size
  19, // Type
  0, // ReqI
  4, // UCID
  3, // Reason
  14, // Total
  0, // Sp2
  0, // Sp3
]);

describe('IS_CNL', () => {
  testInfoPacket({
    packetClass: IS_CNL,
    size,
    type: PacketType.ISP_CNL,
    data,
    buffer,
  });
});
