import { testInstructionPacket } from '../../utils/tests';
import type { IS_SCC_Data } from '..';
import { IS_SCC, PacketType, ViewIdentifier } from '..';

const size = 8;

const data: IS_SCC_Data = {
  ViewPLID: 1,
  InGameCam: ViewIdentifier.VIEW_DRIVER,
};

const buffer = Buffer.from([
  size / new IS_SCC().SIZE_MULTIPLIER, // Size
  8, // Type
  0, // ReqI
  0, // Zero
  1, // ViewPLID
  3, // InGameCam
  0, // Sp2
  0, // Sp3
]);

describe('IS_SCC', () => {
  testInstructionPacket({
    packetClass: IS_SCC,
    size,
    type: PacketType.ISP_SCC,
    data,
    buffer,
  });
});
