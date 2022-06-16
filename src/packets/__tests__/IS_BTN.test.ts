import { checkPacketDataSize, stringToBytes } from '../../utils';
import type { IS_BTN_Data } from '..';
import { ButtonInstFlags, ButtonStyle, IS_BTN } from '..';
import { BasePacket } from '../BasePacket';
import { PacketType } from '../packetTypes';

const text =
  '123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789$';

const data: IS_BTN_Data = {
  ReqI: 1,
  UCID: 2,
  ClickID: 3,
  Inst: ButtonInstFlags.INST_ALWAYS_ON,
  BStyle: ButtonStyle.ISB_C1 | ButtonStyle.ISB_CLICK,
  TypeIn: 3,
  L: 20,
  T: 30,
  W: 40,
  H: 50,
  Text: text,
};

describe('IS_BTN', () => {
  checkPacketDataSize(new IS_BTN());

  it('should fill data from the constructor', () => {
    const packet = new IS_BTN(data);

    expect(packet.ReqI).toEqual(data.ReqI);
    expect(packet.UCID).toEqual(data.UCID);
    expect(packet.ClickID).toEqual(data.ClickID);
    expect(packet.Inst).toEqual(data.Inst);
    expect(packet.BStyle).toEqual(data.BStyle);
    expect(packet.TypeIn).toEqual(data.TypeIn);
    expect(packet.L).toEqual(data.L);
    expect(packet.T).toEqual(data.T);
    expect(packet.W).toEqual(data.W);
    expect(packet.H).toEqual(data.H);
    expect(packet.Text).toEqual(data.Text);
  });

  it('should pack data into a buffer', () => {
    const expectedBuffer = Buffer.from([
      252 / BasePacket.SIZE_MULTIPLIER, // Size
      PacketType.ISP_BTN, // Type
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
    const actualBuffer = new IS_BTN(data).pack();

    expect(actualBuffer).toEqual(expectedBuffer);
  });

  it('should allocate 4 bytes for en empty text value', () => {
    const data: IS_BTN_Data = {
      ReqI: 1,
      UCID: 2,
      ClickID: 3,
      Inst: ButtonInstFlags.INST_ALWAYS_ON,
      BStyle: ButtonStyle.ISB_C1 | ButtonStyle.ISB_CLICK,
      TypeIn: 3,
      L: 20,
      T: 30,
      W: 40,
      H: 50,
      Text: '',
    };
    const expectedBuffer = Buffer.from([
      16 / BasePacket.SIZE_MULTIPLIER, // Size
      PacketType.ISP_BTN, // Type
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
});
