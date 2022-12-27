import type { PacketTestData } from '../../utils/tests';
import { testInfoPacket } from '../../utils/tests';
import { IS_PSF, PacketType } from '..';
import { AbstractPacket } from '../AbstractPacket';

const size = 12;

const data: PacketTestData<IS_PSF> = {
  ReqI: 0,
  PLID: 2,
  STime: 16974425,
  Spare: 0,
};

const buffer = Buffer.from([
  size / AbstractPacket.SIZE_MULTIPLIER, // Size
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
