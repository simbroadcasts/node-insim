import type { PacketTestData } from '../../tests';
import { testInstructionPacket } from '../../tests';
import { IR_ARQ, PacketType } from '..';

const size = 4;

const data: PacketTestData<IR_ARQ> = {
  ReqI: 2,
  Sp0: 0,
};

const buffer = new Uint8Array([
  size / new IR_ARQ().SIZE_MULTIPLIER, // Size
  250, // Type
  2, // ReqI
  0, // Sp0
]);

describe('IR_ARQ', () => {
  testInstructionPacket({
    packetClass: IR_ARQ,
    type: PacketType.IRP_ARQ,
    size,
    data,
    buffer,
  });
});
