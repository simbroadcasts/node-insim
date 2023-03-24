import type { PacketTestData } from '../../tests';
import { stringToBytes, testInfoPacket } from '../../tests';
import { IS_III, PacketType } from '..';

const size = 72;

const msg = 'This string is a very long text sixty four characters long yes.';

const data: PacketTestData<IS_III> = {
  ReqI: 0,
  Zero: 0,
  UCID: 2,
  PLID: 4,
  Msg: msg,
};

const buffer = new Uint8Array([
  size / new IS_III().SIZE_MULTIPLIER, // Size
  12, // Type
  0, // ReqI
  0, // Zero
  2, // UCID
  4, // PLID
  0, // Sp2
  0, // Sp3
  ...stringToBytes(msg), // Msg[64]
  0,
]);

describe('IS_III', () => {
  testInfoPacket({
    packetClass: IS_III,
    size,
    type: PacketType.ISP_III,
    data,
    buffer,
  });
});
