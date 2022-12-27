import { testSendablePacket } from '../../utils';
import type { IS_SFP_Data } from '..';
import { IS_SFP, PacketType, StateFlags } from '..';
import { BasePacket } from '../BasePacket';

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

describe('IS_SFP', () => {
  testSendablePacket(IS_SFP, 8, PacketType.ISP_SFP, data, expectedBuffer);
});
