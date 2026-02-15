import { testInstructionPacket } from '../tests';
import { PacketType } from './enums';
import type { IS_SCH_Data } from './IS_SCH';
import { CharacterModifiers } from './IS_SCH';
import { IS_SCH } from './IS_SCH';

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
