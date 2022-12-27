import { stringToBytes, testInstructionPacket } from '../../utils/tests';
import type { IS_MTC_Data } from '..';
import { IS_MTC, PacketType } from '..';
import { AbstractPacket } from '../AbstractPacket';
import { MessageSound } from '../enums';

const text =
  'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque pe';

const data: IS_MTC_Data = {
  Sound: MessageSound.SND_INVALIDKEY,
  UCID: 1,
  PLID: 2,
  Text: text,
};

const buffer = Buffer.from([
  136 / AbstractPacket.SIZE_MULTIPLIER, // Size
  14, // Type
  0, // ReqI
  3, // Sound
  1, // UCID
  2, // PLID
  0, // Sp2
  0, // Sp3
  ...stringToBytes(text), // Text[128]
  0,
]);

describe('IS_MTC', () => {
  testInstructionPacket({
    packetClass: IS_MTC,
    size: 8, // Size without dynamic part
    type: PacketType.ISP_MTC,
    data,
    buffer,
  });

  it('should allocate 4 bytes for en empty text value', () => {
    const data: IS_MTC_Data = {
      Sound: MessageSound.SND_INVALIDKEY,
      UCID: 1,
      PLID: 2,
      Text: '',
    };
    const expectedBuffer = Buffer.from([
      12 / AbstractPacket.SIZE_MULTIPLIER, // Size
      PacketType.ISP_MTC, // Type
      0, // ReqI
      3, // Sound
      1, // UCID
      2, // PLID
      0, // Sp2
      0, // Sp3
      ''.charCodeAt(0), // Text[4]
      0,
      0,
      0,
    ]);
    const actualBuffer = new IS_MTC(data).pack();

    expect(actualBuffer).toEqual(expectedBuffer);
  });

  it('should throw a range error if Text length is greater than 127', () => {
    expect(() => {
      new IS_MTC({
        Text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque peas',
      }).pack();
    }).toThrow(RangeError);
  });
});
