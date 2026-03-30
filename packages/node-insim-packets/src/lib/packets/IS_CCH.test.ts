import { PacketType } from '../enums/PacketType.js';
import { ViewIdentifier } from '../enums/ViewIdentifier.js';
import type { PacketTestData } from '../tests.js';
import { testInfoPacket } from '../tests.js';
import { IS_CCH } from './IS_CCH.js';

const size = 8;

const data: PacketTestData<IS_CCH> = {
  PLID: 3,
  Camera: ViewIdentifier.VIEW_CUSTOM,
};

const buffer = new Uint8Array([
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
