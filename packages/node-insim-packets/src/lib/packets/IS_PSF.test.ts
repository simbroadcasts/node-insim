import { PacketType } from '../enums/index.js';
import type { PacketTestData } from '../tests';
import { testInfoPacket } from '../tests';
import { IS_PSF } from './IS_PSF.js';

const size = 12;

const data: PacketTestData<IS_PSF> = {
  ReqI: 0,
  PLID: 2,
  STime: 16974425,
};

const buffer = new Uint8Array([
  size / new IS_PSF().SIZE_MULTIPLIER, // Size
  27, // Type
  0, // ReqI
  2, // PLID
  345, // STime (1)
  2, // STime (2)
  3, // STime (3)
  1, // STime (4)
  0, // Spare (1)
  0, // Spare (2)
  0, // Spare (3)
  0, // Spare (4)
]);

describe('IS_PSF', () => {
  testInfoPacket({
    packetClass: IS_PSF,
    size,
    type: PacketType.ISP_PSF,
    data,
    buffer,
  });
});
