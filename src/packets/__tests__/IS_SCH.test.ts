import { testInstructionPacket } from '../../utils/tests';
import type { IS_SCH_Data } from '..';
import { CharacterModifiers, IS_SCH, PacketType } from '..';

const size = 8;

const data: IS_SCH_Data = {
  CharB: 23,
  Flags: CharacterModifiers.SHIFT,
};

const buffer = Buffer.from([
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
