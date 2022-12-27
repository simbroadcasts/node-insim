import type { PacketTestData } from '../../utils/tests';
import { stringToBytes, testInfoPacket } from '../../utils/tests';
import { IS_BTN, IS_BTT, PacketType } from '..';
import { AbstractPacket } from '../base';

const size = 104;
const text =
  '123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456';

const data: PacketTestData<IS_BTT> = {
  ReqI: 1,
  UCID: 2,
  ClickID: 3,
  Inst: IS_BTN.INST_ALWAYS_ON,
  TypeIn: 7,
  Text: text,
};

const buffer = Buffer.from([
  size / AbstractPacket.SIZE_MULTIPLIER, // Size
  47, // Type
  1, // ReqI
  2, // UCID
  3, // ClickID
  128, // Inst
  7, // TypeIn
  0, // Sp3
  ...stringToBytes(text), // Text[96]
  '1'.charCodeAt(0),
  '2'.charCodeAt(0),
  '3'.charCodeAt(0),
  '4'.charCodeAt(0),
  '5'.charCodeAt(0),
  '$'.charCodeAt(0),
]);

describe('IS_BTT', () => {
  testInfoPacket({
    packetClass: IS_BTT,
    size,
    type: PacketType.ISP_BTT,
    data,
    buffer,
  });
});
