import type { PacketTestData } from '../../utils/tests';
import { testInfoPacket } from '../../utils/tests';
import { InSimRelayError, IR_ERR, PacketType } from '..';

const size = 4 + 3 * 40;

const data: PacketTestData<IR_ERR> = {
  ReqI: 2,
  ErrNo: InSimRelayError.IR_ERR_ADMIN,
};

const buffer = new Uint8Array([
  size / new IR_ERR().SIZE_MULTIPLIER, // Size
  255, // Type
  2, // ReqI
  4, // ErrNo
]);

describe('IR_ERR', () => {
  testInfoPacket({
    packetClass: IR_ERR,
    type: PacketType.IRP_ERR,
    size,
    data,
    buffer,
  });
});
