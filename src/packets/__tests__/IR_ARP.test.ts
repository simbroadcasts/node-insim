import type { PacketTestData } from '../../tests';
import { testInfoPacket } from '../../tests';
import { IR_ARP, PacketType } from '..';

const size = 4;

const data: PacketTestData<IR_ARP> = {
  ReqI: 2,
  Admin: 1,
};

const buffer = new Uint8Array([
  size / new IR_ARP().SIZE_MULTIPLIER, // Size
  251, // Type
  2, // ReqI
  1, // Admin
]);

describe('IR_ARP', () => {
  testInfoPacket({
    packetClass: IR_ARP,
    type: PacketType.IRP_ARP,
    size,
    data,
    buffer,
  });
});
