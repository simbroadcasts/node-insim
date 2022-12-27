import { stringToBytes, testSendablePacket } from '../../utils';
import type { IS_MSX_Data } from '..';
import { IS_MSX, PacketType } from '..';
import { AbstractPacket } from '../AbstractPacket';

const data: IS_MSX_Data = {
  Msg: 'You know that this is a very long text message whose length can be up to ninety five characters',
};

const expectedBuffer = Buffer.from([
  100 / AbstractPacket.SIZE_MULTIPLIER, // Size
  39, // Type
  0, // ReqI
  0, // Zero
  ...stringToBytes(data.Msg),
  0,
]);

describe('IS_MSX', () => {
  testSendablePacket(IS_MSX, 100, PacketType.ISP_MSX, data, expectedBuffer);

  it('should throw a range error if Msg length is greater than 95', () => {
    expect(() => {
      new IS_MSX({
        Msg: 'You know that this is a very long text message whose length can be up to ninety six characters!!',
      }).pack();
    }).toThrow(RangeError);
  });
});
