import { stringToBytes, testInstructionPacket } from '../tests';
import { MessageSound, PacketType } from './enums';
import type { IS_MTC_Data } from './IS_MTC';
import { IS_MTC } from './IS_MTC';

const text =
  'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque pe';

const data: IS_MTC_Data = {
  Sound: MessageSound.SND_INVALIDKEY,
  UCID: 1,
  PLID: 2,
  Text: text,
};

const buffer = new Uint8Array([
  136 / new IS_MTC().SIZE_MULTIPLIER, // Size
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
    const expectedBuffer = new Uint8Array([
      12 / new IS_MTC().SIZE_MULTIPLIER, // Size
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

  it('should truncate Text if it is longer than 127 characters', () => {
    expect(
      new IS_MTC({
        Text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque pea',
      }).pack(),
    ).toEqual(
      new Uint8Array([
        136 / new IS_MTC().SIZE_MULTIPLIER, // Size
        14, // Type
        0, // ReqI
        0, // Sound
        0, // UCID
        0, // PLID
        0, // Sp2
        0, // Sp3
        ...stringToBytes(
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque pe',
        ), // Text[128]
        0,
      ]),
    );
  });
});
