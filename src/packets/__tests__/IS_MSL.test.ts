import { stringToBytes, testSendablePacket } from '../../utils';
import type { IS_MSL_Data } from '..';
import { IS_MSL, MessageSound, PacketType } from '..';
import { AbstractPacket } from '../AbstractPacket';

const msg =
  'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque pe';

const data: IS_MSL_Data = {
  Msg: msg,
  Sound: MessageSound.SND_ERROR,
};

const expectedBuffer = Buffer.from([
  132 / AbstractPacket.SIZE_MULTIPLIER, // Size
  40, // Type
  0, // ReqI
  4, // Sound
  ...stringToBytes(msg), // Msg[128]
  0,
]);

describe('IS_MSL', () => {
  testSendablePacket(IS_MSL, 132, PacketType.ISP_MSL, data, expectedBuffer);

  it('should throw a range error if Msg length is greater than 127', () => {
    expect(() => {
      new IS_MSL({
        Msg: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque pea',
      }).pack();
    }).toThrow(RangeError);
  });
});
