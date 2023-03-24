import type { PacketTestData } from '../../utils/tests';
import { testInstructionPacket } from '../../utils/tests';
import { IR_HLR, PacketType } from '..';

const size = 4;

const data: PacketTestData<IR_HLR> = {
  ReqI: 2,
  Sp0: 0,
};

const buffer = new Uint8Array([
  size / new IR_HLR().SIZE_MULTIPLIER, // Size
  252, // Type
  2, // ReqI
  0, // Sp0
]);

describe('IR_HLR', () => {
  testInstructionPacket({
    packetClass: IR_HLR,
    type: PacketType.IRP_HLR,
    size,
    data,
    buffer,
  });
});
