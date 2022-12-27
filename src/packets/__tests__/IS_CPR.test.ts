import type { PacketTestData } from '../../utils';
import { stringToBytes, testInfoPacket } from '../../utils';
import { IS_CPR, PacketType } from '..';
import { AbstractPacket } from '../AbstractPacket';

const size = 36;

const data: PacketTestData<IS_CPR> = {
  ReqI: 0,
  UCID: 3,
  PName: '123456789 123456789 user',
  Plate: '12345678',
};

const buffer = Buffer.from([
  size / AbstractPacket.SIZE_MULTIPLIER, // Size
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
