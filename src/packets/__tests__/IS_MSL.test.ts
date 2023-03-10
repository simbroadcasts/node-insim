import { stringToBytes, testInstructionPacket } from '../../utils/tests';
import type { IS_MSL_Data } from '..';
import { IS_MSL, MessageSound, PacketType } from '..';

const msg =
  'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque pe';

const size = 132;

const data: IS_MSL_Data = {
  Msg: msg,
  Sound: MessageSound.SND_ERROR,
};

const buffer = new Uint8Array([
  size / new IS_MSL().SIZE_MULTIPLIER, // Size
  40, // Type
  0, // ReqI
  4, // Sound
  ...stringToBytes(msg), // Msg[128]
  0,
]);

describe('IS_MSL', () => {
  testInstructionPacket({
    packetClass: IS_MSL,
    size,
    type: PacketType.ISP_MSL,
    data,
    buffer,
  });

  it('should truncate Msg if it is longer than 127 characters', () => {
    expect(
      new IS_MSL({
        Msg: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque pea',
      }).pack(),
    ).toEqual(
      new Uint8Array([
        size / new IS_MSL().SIZE_MULTIPLIER, // Size
        40, // Type
        0, // ReqI
        0, // Sound
        ...stringToBytes(
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque pe',
        ), // Msg[128]
        0,
      ]),
    );
  });
});
