import type { PacketTestData } from '../../tests';
import { stringToBytes, testInstructionPacket } from '../../tests';
import { IR_SEL, IR_SEL_ReqI, PacketType } from '..';

const size = 68;

const data: PacketTestData<IR_SEL> = {
  ReqI: IR_SEL_ReqI.SEND_VERSION,
  Zero: 0,
  HName: 'SAVAGE SimSports',
  Admin: 'admin password',
  Spec: 'spec password',
};

const buffer = new Uint8Array([
  size / new IR_SEL().SIZE_MULTIPLIER, // Size
  254, // Type
  1, // ReqI
  0, // Zero
  ...stringToBytes('SAVAGE SimSports'), // HName[32]
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  ...stringToBytes('admin password'), // Admin[16]
  0,
  0,
  ...stringToBytes('spec password'), // Spec[16]
  0,
  0,
  0,
]);

describe('IR_SEL', () => {
  testInstructionPacket({
    packetClass: IR_SEL,
    type: PacketType.IRP_SEL,
    size,
    data,
    buffer,
  });
});
