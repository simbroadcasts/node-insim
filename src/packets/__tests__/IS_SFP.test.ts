import { testInstructionPacket } from '../../utils/tests';
import type { IS_SFP_Data } from '..';
import { IS_SFP, PacketType, StateFlags } from '..';
import { AbstractPacket } from '../AbstractPacket';

const size = 8;

const data: IS_SFP_Data = {
  Flag: StateFlags.ISS_SHOW_2D | StateFlags.ISS_MPSPEEDUP,
  OffOn: 1,
};

const buffer = Buffer.from([
  size / AbstractPacket.SIZE_MULTIPLIER, // Size
  7, // Type
  0, // ReqI
  0, // Zero
  128, // Flag (1)
  4, // Flag (2)
  1, // OffOn
  0, // Sp3
]);

describe('IS_SFP', () => {
  testInstructionPacket({
    packetClass: IS_SFP,
    size,
    type: PacketType.ISP_SFP,
    data,
    buffer,
  });
});
