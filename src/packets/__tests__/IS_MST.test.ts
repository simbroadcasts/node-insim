import { stringToBytes, testInstructionPacket } from '../../utils';
import type { IS_MST_Data } from '..';
import { IS_MST, PacketType } from '..';
import { AbstractPacket } from '../AbstractPacket';

const size = 68;

const data: IS_MST_Data = {
  Msg: 'This is a message whose length will be sixty three characters!!',
};

const buffer = Buffer.from([
  size / AbstractPacket.SIZE_MULTIPLIER, // Size
  13, // Type
  0, // ReqI
  0, // Zero
  ...stringToBytes(data.Msg), // Msg[64]
  0,
]);

describe('IS_MST', () => {
  testInstructionPacket({
    packetClass: IS_MST,
    size,
    type: PacketType.ISP_MST,
    data,
    buffer,
  });

  it('should throw a range error if Msg length is greater than 63', () => {
    expect(() => {
      new IS_MST({
        Msg: 'This is a message whose length will be sixty four characters yes',
      }).pack();
    }).toThrow(RangeError);
  });
});
