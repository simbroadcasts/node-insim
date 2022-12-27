import { testSendablePacket } from '../../utils';
import type { IS_SCC_Data } from '..';
import { IS_SCC, PacketType, ViewIdentifier } from '..';
import { BasePacket } from '../BasePacket';

const data: IS_SCC_Data = {
  ViewPLID: 1,
  InGameCam: ViewIdentifier.VIEW_DRIVER,
};

const expectedBuffer = Buffer.from([
  8 / BasePacket.SIZE_MULTIPLIER, // Size
  8, // Type
  0, // ReqI
  0, // Zero
  1, // ViewPLID
  3, // InGameCam
  0, // Sp2
  0, // Sp3
]);

describe('IS_SCC', () => {
  testSendablePacket(IS_SCC, 8, PacketType.ISP_SCC, data, expectedBuffer);
});
