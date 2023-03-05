import { stringToBytes, testInstructionPacket } from '../../utils/tests';
import type { IS_MSX_Data } from '..';
import { IS_MSX, PacketType } from '..';

const size = 100;

const data: IS_MSX_Data = {
  Msg: 'You know that this is a very long text message whose length can be up to ninety five characters',
};

const buffer = Buffer.from([
  size / new IS_MSX().SIZE_MULTIPLIER, // Size
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

  it('should truncate Msg if it is longer than 95 characters', () => {
    expect(
      new IS_MSX({
        Msg: 'You know that this is a very long text message whose length can be up to ninety six characters!!',
      }).pack(),
    ).toEqual(
      Buffer.from([
        size / new IS_MSX().SIZE_MULTIPLIER, // Size
        39, // Type
        0, // ReqI
        0, // Zero
        ...stringToBytes(
          'You know that this is a very long text message whose length can be up to ninety six characters!',
        ), // Msg[96]
        0,
      ]),
    );
  });
});
