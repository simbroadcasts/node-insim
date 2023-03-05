import type { PacketTestData } from '../../utils/tests';
import { stringToBytes, testInfoPacket } from '../../utils/tests';
import { IS_CPR, PacketType } from '..';

const size = 36;

const data: PacketTestData<IS_CPR> = {
  ReqI: 0,
  UCID: 3,
  PName: '123456789 123456789 user',
  Plate: '12345678',
};

const buffer = Buffer.from([
  size / new IS_CPR().SIZE_MULTIPLIER, // Size
  20, // Type
  0, // ReqI
  3, // UCID
  ...stringToBytes('123456789 123456789 user'), // UName[24]
  ...stringToBytes('12345678'), // Plate[8]
]);

describe('IS_CPR', () => {
  testInfoPacket({
    packetClass: IS_CPR,
    size,
    type: PacketType.ISP_CPR,
    data,
    buffer,
  });
});
