import type { PacketTestData } from '../../utils/tests';
import { testInfoPacket } from '../../utils/tests';
import { IS_CCH, PacketType, ViewIdentifier } from '..';

const size = 8;

const data: PacketTestData<IS_CCH> = {
  PLID: 3,
  Camera: ViewIdentifier.VIEW_CUSTOM,
};

const buffer = Buffer.from([
  size / new IS_CCH().SIZE_MULTIPLIER, // Size
  29, // Type
  0, // ReqI
  3, // PLID
  4, // Camera
  0, // Sp1
  0, // Sp2
  0, // Sp3
]);

describe('IS_CCH', () => {
  testInfoPacket({
    packetClass: IS_CCH,
    size,
    type: PacketType.ISP_CCH,
    data,
    buffer,
  });
});
