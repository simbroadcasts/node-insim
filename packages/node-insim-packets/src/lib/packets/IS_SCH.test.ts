import { PacketType } from '../enums/index.js';
import { testInstructionPacket } from '../tests';
import type { IS_SCH_Data } from './IS_SCH.js';
import { CharacterModifiers } from './IS_SCH.js';
import { IS_SCH } from './IS_SCH.js';

const size = 8;

const data: IS_SCH_Data = {
  CharB: 23,
  Flags: CharacterModifiers.SHIFT,
};

const buffer = new Uint8Array([
  size / new IS_SCH().SIZE_MULTIPLIER, // Size
  6, // Type
  0, // ReqI
  0, // Zero
  23, // CharB
  1, // Flags
  0, // Spare2
  0, // Spare3
]);

describe('IS_SCH', () => {
  testInstructionPacket({
    packetClass: IS_SCH,
    size,
    type: PacketType.ISP_SCH,
    data,
    buffer,
  });
});
