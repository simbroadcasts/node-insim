import { testBothWaysPacket, testInstructionPacket } from '../../utils';
import type { IS_TINY_Data } from '..';
import { IS_TINY, PacketType, TinyType } from '..';
import { AbstractPacket } from '../AbstractPacket';

const data: IS_TINY_Data = {
  ReqI: 1,
  SubT: TinyType.TINY_CLOSE,
};

const buffer = Buffer.from([
  4 / AbstractPacket.SIZE_MULTIPLIER, // Size
  3, // Type
  1, // ReqI
  2, // SubT
]);

describe('IS_TINY', () => {
  testBothWaysPacket({
    packetClass: IS_TINY,
    size: 4,
    type: PacketType.ISP_TINY,
    data,
    buffer,
  });

  it('should throw a range error if sending a request type and ReqI is 0', () => {
    expect(() => {
      new IS_TINY({
        ReqI: 0,
        SubT: TinyType.TINY_VER,
      }).pack();
    }).toThrow(RangeError);
  });

  it('should not throw an error if sending a request type and ReqI is greater than 0', () => {
    expect(() => {
      new IS_TINY({
        ReqI: 1,
        SubT: TinyType.TINY_VER,
      }).pack();
    }).not.toThrow();
  });
});
