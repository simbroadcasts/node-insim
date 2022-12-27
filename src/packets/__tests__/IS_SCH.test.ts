import { testInstructionPacket } from '../../utils';
import type { IS_SCH_Data } from '..';
import { CharacterModifiers, IS_SCH, PacketType } from '..';
import { AbstractPacket } from '../AbstractPacket';

const data: IS_SCH_Data = {
  CharB: 23,
  Flags: CharacterModifiers.SHIFT,
};

const buffer = Buffer.from([
  8 / AbstractPacket.SIZE_MULTIPLIER, // Size
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
    size: 8,
    type: PacketType.ISP_SCH,
    data,
    buffer,
  });
});
