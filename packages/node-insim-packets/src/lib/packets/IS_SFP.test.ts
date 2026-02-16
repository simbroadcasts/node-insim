import { PacketType, StateFlags } from '../enums/index.js';
import { testInstructionPacket } from '../tests';
import type { IS_SFP_Data } from './IS_SFP.js';
import { IS_SFP } from './IS_SFP.js';

const size = 8;

const data: IS_SFP_Data = {
  Flag: StateFlags.ISS_SHOW_2D | StateFlags.ISS_MPSPEEDUP,
  OffOn: 1,
};

const buffer = new Uint8Array([
  size / new IS_SFP().SIZE_MULTIPLIER, // Size
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
