import type { PacketTestData } from '../../utils';
import { testInfoPacket } from '../../utils';
import { IS_TOC, PacketType } from '..';
import { AbstractPacket } from '../AbstractPacket';

const size = 8;

const data: PacketTestData<IS_TOC> = {
  ReqI: 0,
  PLID: 3,
  OldUCID: 1,
  NewUCID: 2,
  Sp2: 0,
  Sp3: 0,
};

const buffer = Buffer.from([
  size / AbstractPacket.SIZE_MULTIPLIER, // Size
  31, // Type
  0, // ReqI
  3, // PLID
  1, // OldUCID
  2, // NewUCID
  0, // Sp2
  0, // Sp3
]);

describe('IS_TOC', () => {
  testInfoPacket({
    packetClass: IS_TOC,
    size,
    type: PacketType.ISP_TOC,
    data,
    buffer,
  });
});
