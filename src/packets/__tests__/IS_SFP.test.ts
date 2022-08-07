import { checkPacketDataSize } from '../../utils';
import type { IS_SFP_Data } from '..';
import { IS_SFP, PacketType, StateFlags } from '..';
import { BasePacket } from '../BasePacket';

describe('IS_SFP', () => {
  checkPacketDataSize(new IS_SFP());

  it('should fill data from the constructor', () => {
    const data: IS_SFP_Data = {
      Flag: StateFlags.ISS_SHOW_2D | StateFlags.ISS_SHIFTU_NO_OPT,
      OffOn: 1,
    };
    const packet = new IS_SFP(data);

    expect(packet.OffOn).toEqual(data.OffOn);
    expect(packet.Flag).toEqual(data.Flag);
  });

  it('should pack data into a buffer', () => {
    const data: IS_SFP_Data = {
      Flag: StateFlags.ISS_SHOW_2D | StateFlags.ISS_MPSPEEDUP,
      OffOn: 1,
    };
    const expectedBuffer = Buffer.from([
      8 / BasePacket.SIZE_MULTIPLIER, // Size
      PacketType.ISP_SFP, // Type
      0, // ReqI
      0, // Zero
      128, // Flag (1)
      4, // Flag (2)
      1, // OffOn
      0, // Sp3
    ]);
    const actualBuffer = new IS_SFP(data).pack();

    expect(actualBuffer).toEqual(expectedBuffer);
  });
});
