import type { PacketTestData } from '../../tests';
import { testInfoPacket } from '../../tests';
import { IS_TOC, PacketType } from '..';

const size = 8;

const data: PacketTestData<IS_TOC> = {
  ReqI: 0,
  PLID: 3,
  OldUCID: 1,
  NewUCID: 2,
};

const buffer = new Uint8Array([
  size / new IS_TOC().SIZE_MULTIPLIER, // Size
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
