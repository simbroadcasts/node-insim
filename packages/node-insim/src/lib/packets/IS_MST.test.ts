import { stringToBytes, testInstructionPacket } from '../tests';
import { PacketType } from './enums';
import type { IS_MST_Data } from './IS_MST';
import { IS_MST } from './IS_MST';

const size = 68;

const data: IS_MST_Data = {
  Msg: 'This is a message whose length will be sixty three characters!!',
};

const buffer = new Uint8Array([
  size / new IS_MST().SIZE_MULTIPLIER, // Size
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

  it('should truncate Msg if it is longer than 63 characters', () => {
    expect(
      new IS_MST({
        Msg: 'This is a message whose length will be sixty four characters yes',
      }).pack(),
    ).toEqual(
      new Uint8Array([
        size / new IS_MST().SIZE_MULTIPLIER, // Size
        13, // Type
        0, // ReqI
        0, // Zero
        ...stringToBytes(
          'This is a message whose length will be sixty four characters ye',
        ), // Msg[64]
        0,
      ]),
    );
  });
});
