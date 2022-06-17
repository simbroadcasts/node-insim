import { checkPacketDataSize } from '../../utils';
import type { IS_SCH_Data } from '..';
import { CharacterModifiers, IS_SCH, PacketType } from '..';
import { BasePacket } from '../BasePacket';

describe('IS_SCH', () => {
  checkPacketDataSize(new IS_SCH());

  it('should fill data from the constructor', () => {
    const data: IS_SCH_Data = {
      CharB: 23,
      Flags: CharacterModifiers.SHIFT,
    };
    const packet = new IS_SCH(data);

    expect(packet.ReqI).toEqual(0);
    expect(packet.CharB).toEqual(23);
    expect(packet.Flags).toEqual(CharacterModifiers.SHIFT);
  });

  it('should pack data into a buffer', () => {
    const data: IS_SCH_Data = {
      CharB: 23,
      Flags: CharacterModifiers.SHIFT,
    };
    const actualBuffer = new IS_SCH(data).pack();
    const expectedBuffer = Buffer.from([
      8 / BasePacket.SIZE_MULTIPLIER, // Size
      PacketType.ISP_SCH, // Type
      0, // ReqI
      0, // Zero
      23, // CharB
      1, // Flags
      0, // Spare2
      0, // Spare3
    ]);

    expect(actualBuffer).toEqual(expectedBuffer);
  });
});
