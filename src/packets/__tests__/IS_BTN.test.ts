import { stringToBytes, testSendablePacket } from '../../utils';
import type { IS_BTN_Data } from '..';
import { ButtonStyle, IS_BTN, PacketType } from '..';
import { AbstractPacket } from '../AbstractPacket';

const text =
  '123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789$';

const data: IS_BTN_Data = {
  ReqI: 1,
  UCID: 2,
  ClickID: 3,
  Inst: IS_BTN.INST_ALWAYS_ON,
  BStyle: ButtonStyle.ISB_C1 | ButtonStyle.ISB_CLICK,
  TypeIn: 3,
  L: 20,
  T: 30,
  W: 40,
  H: 50,
  Text: text,
};

const expectedBuffer = Buffer.from([
  252 / AbstractPacket.SIZE_MULTIPLIER, // Size
  45, // Type
  1, // ReqI
  2, // UCID
  3, // ClickID
  128, // Inst
  9, // BStyle
  3, // TypeIn
  20, // L
  30, // T
  40, // W
  50, // H
  ...stringToBytes(text), // Text[240]
]);

describe('IS_BTN', () => {
  testSendablePacket(IS_BTN, 12, PacketType.ISP_BTN, data, expectedBuffer);

  it('should allocate 4 bytes for en empty text value', () => {
    const data: IS_BTN_Data = {
      ReqI: 1,
      UCID: 2,
      ClickID: 3,
      Inst: IS_BTN.INST_ALWAYS_ON,
      BStyle: ButtonStyle.ISB_C1 | ButtonStyle.ISB_CLICK,
      TypeIn: 3,
      L: 20,
      T: 30,
      W: 40,
      H: 50,
      Text: '',
    };
    const expectedBuffer = Buffer.from([
      16 / AbstractPacket.SIZE_MULTIPLIER, // Size
      45, // Type
      1, // ReqI
      2, // UCID
      3, // ClickID
      128, // Inst
      9, // BStyle
      3, // TypeIn
      20, // L
      30, // T
      40, // W
      50, // H
      ''.charCodeAt(0), // Text (4)
      0,
      0,
      0,
    ]);
    const actualBuffer = new IS_BTN(data).pack();

    expect(actualBuffer).toEqual(expectedBuffer);
  });

  it('should throw a range error if ReqI is 0', () => {
    expect(() => {
      new IS_BTN({
        ReqI: 0,
      }).pack();
    }).toThrow(RangeError);
  });

  it('should throw a range error if ClickID is greater than 239', () => {
    expect(() => {
      new IS_BTN({
        ReqI: 1,
        ClickID: 240,
      }).pack();
    }).toThrow(RangeError);
  });
});
