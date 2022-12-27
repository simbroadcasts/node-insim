import { testSendablePacket } from '../../utils';
import type { IS_SCH_Data } from '..';
import { CharacterModifiers, IS_SCH, PacketType } from '..';
import { BasePacket } from '../BasePacket';

const data: IS_SCH_Data = {
  CharB: 23,
  Flags: CharacterModifiers.SHIFT,
};

const expectedBuffer = Buffer.from([
  8 / BasePacket.SIZE_MULTIPLIER, // Size
  6, // Type
  0, // ReqI
  0, // Zero
  23, // CharB
  1, // Flags
  0, // Spare2
  0, // Spare3
]);

describe('IS_SCH', () => {
  testSendablePacket(IS_SCH, 8, PacketType.ISP_SCH, data, expectedBuffer);
});
