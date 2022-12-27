import { stringToBytes } from '../../utils';
import { IS_BTN, PacketType } from '..';
import { IS_BTT } from '..';
import { AbstractPacket } from '../AbstractPacket';

describe('IS_BTT', () => {
  it('should unpack data from a buffer', () => {
    const buffer = Buffer.from([
      104 / AbstractPacket.SIZE_MULTIPLIER, // Size
      47, // Type
      1, // ReqI
      2, // UCID
      3, // ClickID
      128, // Inst
      7, // TypeIn
      0, // Sp3
      ...stringToBytes(
        '123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456',
      ), // Text[96]
      '1'.charCodeAt(0),
      '2'.charCodeAt(0),
      '3'.charCodeAt(0),
      '4'.charCodeAt(0),
      '5'.charCodeAt(0),
      '$'.charCodeAt(0),
    ]);
    const packet = new IS_BTT().unpack(buffer);

    expect(packet.Size).toEqual(104);
    expect(packet.Type).toEqual(PacketType.ISP_BTT);
    expect(packet.ReqI).toEqual(1);
    expect(packet.UCID).toEqual(2);
    expect(packet.ClickID).toEqual(3);
    expect(packet.Inst).toEqual(IS_BTN.INST_ALWAYS_ON);
    expect(packet.TypeIn).toEqual(7);
    expect(packet.Sp3).toEqual(0);
    expect(packet.Text).toEqual(
      '123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456',
    );
  });
});
