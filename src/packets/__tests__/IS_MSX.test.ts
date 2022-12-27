import { stringToBytes, testInstructionPacket } from '../../utils';
import type { IS_MSX_Data } from '..';
import { IS_MSX, PacketType } from '..';
import { AbstractPacket } from '../AbstractPacket';

const size = 100;

const data: IS_MSX_Data = {
  Msg: 'You know that this is a very long text message whose length can be up to ninety five characters',
};

const buffer = Buffer.from([
  size / AbstractPacket.SIZE_MULTIPLIER, // Size
  39, // Type
  0, // ReqI
  0, // Zero
  ...stringToBytes(data.Msg), // Msg[96]
  0,
]);

describe('IS_MSX', () => {
  testInstructionPacket({
    packetClass: IS_MSX,
    size,
    type: PacketType.ISP_MSX,
    data,
    buffer,
  });

  it('should throw a range error if Msg length is greater than 95', () => {
    expect(() => {
      new IS_MSX({
        Msg: 'You know that this is a very long text message whose length can be up to ninety six characters!!',
      }).pack();
    }).toThrow(RangeError);
  });
});
