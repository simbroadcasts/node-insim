import { testBothWaysPacket } from '../tests';
import { ButtonFunction, PacketType } from './enums';
import type { IS_BFN_Data } from './IS_BFN';
import { IS_BFN } from './IS_BFN';

const size = 8;

const data: IS_BFN_Data = {
  SubT: ButtonFunction.BFN_REQUEST,
  UCID: 4,
  ClickID: 45,
  ClickMax: 48,
  Inst: 5,
};

const buffer = new Uint8Array([
  size / new IS_BFN().SIZE_MULTIPLIER, // Size
  42, // Type
  0, // ReqI
  3, // SubT
  4, // UCID
  45, // ClickID
  48, // ClickMax
  5, // Inst
]);

describe('IS_BFN', () => {
  testBothWaysPacket({
    packetClass: IS_BFN,
    size,
    type: PacketType.ISP_BFN,
    data,
    buffer,
  });

  it('should throw a range error if ClickID is greater than 239', () => {
    expect(() => {
      new IS_BFN({ ClickID: 240 }).pack();
    }).toThrow(RangeError);
  });

  it('should throw a range error if ClickMax is greater than 239', () => {
    expect(() => {
      new IS_BFN({ ClickMax: 240 }).pack();
    }).toThrow(RangeError);
  });
});
