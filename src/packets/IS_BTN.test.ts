import { stringToBytes, testInstructionPacket } from '../tests';
import { ButtonStyle, ButtonTextColour, PacketType } from './enums';
import type { IS_BTN_Data } from './IS_BTN';
import { IS_BTN } from './IS_BTN';

const text =
  '123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789$';

const data: IS_BTN_Data = {
  ReqI: 1,
  UCID: 2,
  ClickID: 3,
  Inst: IS_BTN.INST_ALWAYS_ON,
  BStyle: ButtonTextColour.TITLE_COLOUR | ButtonStyle.ISB_CLICK,
  TypeIn: 3,
  L: 20,
  T: 30,
  W: 40,
  H: 50,
  Text: text,
};

const buffer = new Uint8Array([
  252 / new IS_BTN().SIZE_MULTIPLIER, // Size
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
  testInstructionPacket({
    packetClass: IS_BTN,
    size: 12, // Default size without dynamic data
    type: PacketType.ISP_BTN,
    data,
    buffer,
  });

  it('should allocate 4 bytes for en empty text value', () => {
    const data: IS_BTN_Data = {
      ReqI: 1,
      UCID: 2,
      ClickID: 3,
      Inst: IS_BTN.INST_ALWAYS_ON,
      BStyle: ButtonTextColour.TITLE_COLOUR | ButtonStyle.ISB_CLICK,
      TypeIn: 3,
      L: 20,
      T: 30,
      W: 40,
      H: 50,
      Text: '',
    };
    const expectedBuffer = new Uint8Array([
      16 / new IS_BTN().SIZE_MULTIPLIER, // Size
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
      new IS_BTN({ ReqI: 0 }).pack();
    }).toThrow(RangeError);
  });

  it('should throw a range error if ClickID is greater than 239', () => {
    expect(() => {
      new IS_BTN({ ReqI: 1, ClickID: 240 }).pack();
    }).toThrow(RangeError);
  });
});
