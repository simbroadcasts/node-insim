import type { PacketTestData } from '../tests';
import { testInstructionPacket } from '../tests';
import { PacketType } from './enums';
import { IR_HLR } from './IR_HLR';

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
