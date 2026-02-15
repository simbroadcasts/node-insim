import type { PacketTestData } from '../tests';
import { stringToBytes, testInfoPacket } from '../tests';
import { PacketType } from './enums';
import { IS_AXI } from './IS_AXI';

const size = 40;

const data: PacketTestData<IS_AXI> = {
  Zero: 0,
  AXStart: 2,
  NumCP: 3,
  NumO: 4375,
  LName: 'Lorem ipsum dolor sit amet, cons',
};

const buffer = new Uint8Array([
  size / new IS_AXI().SIZE_MULTIPLIER, // Size
  43, // Type
  0, // ReqI
  0, // Zero
  2, // AXStart
  3, // NumCP
  23, // NumO (1)
  17, // NumO (2)
  ...stringToBytes('Lorem ipsum dolor sit amet, cons'),
]);

describe('IS_AXI', () => {
  testInfoPacket({
    packetClass: IS_AXI,
    type: PacketType.ISP_AXI,
    size,
    buffer,
    data,
  });
});
