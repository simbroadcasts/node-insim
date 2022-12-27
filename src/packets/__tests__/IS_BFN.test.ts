import { testSendablePacket } from '../../utils';
import type { IS_BFN_Data } from '..';
import { ButtonFunction, IS_BFN, PacketType } from '..';
import { AbstractPacket } from '../AbstractPacket';

const data: IS_BFN_Data = {
  SubT: ButtonFunction.BFN_REQUEST,
  UCID: 4,
  ClickID: 45,
  ClickMax: 48,
  Inst: 5,
};

const expectedBuffer = Buffer.from([
  8 / AbstractPacket.SIZE_MULTIPLIER, // Size
  42, // Type
  0, // ReqI
  3, // SubT
  4, // UCID
  45, // ClickID
  48, // ClickMax
  5, // Inst
]);

describe('IS_BFN', () => {
  testSendablePacket(IS_BFN, 8, PacketType.ISP_BFN, data, expectedBuffer);

  it('should unpack data from a buffer', () => {
    const packet = new IS_BFN().unpack(expectedBuffer);

    expect(packet.Size).toEqual(8);
    expect(packet.Type).toEqual(PacketType.ISP_BFN);
    expect(packet.ReqI).toEqual(0);
    expect(packet.SubT).toEqual(ButtonFunction.BFN_REQUEST);
    expect(packet.UCID).toEqual(4);
    expect(packet.ClickID).toEqual(45);
    expect(packet.ClickMax).toEqual(48);
    expect(packet.Inst).toEqual(5);
  });
});
