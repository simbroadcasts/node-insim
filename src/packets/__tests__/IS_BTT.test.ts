import { BasePacket } from '../BasePacket';
import { ButtonInstFlags } from '../IS_BTN';
import { IS_BTT } from '../IS_BTT';
import { PacketType } from '../packetTypes';

describe('IS_BTT', () => {
  it('should unpack data from a buffer', () => {
    const from1to9 = [
      '1'.charCodeAt(0),
      '2'.charCodeAt(0),
      '3'.charCodeAt(0),
      '4'.charCodeAt(0),
      '5'.charCodeAt(0),
      '6'.charCodeAt(0),
      '7'.charCodeAt(0),
      '8'.charCodeAt(0),
      '9'.charCodeAt(0),
      ' '.charCodeAt(0),
    ];
    const buffer = Buffer.from([
      104 / BasePacket.SIZE_MULTIPLIER, // Size
      PacketType.ISP_BTT, // Type
      1, // ReqI
      2, // UCID
      3, // ClickID
      ButtonInstFlags.INST_ALWAYS_ON, // Inst
      7, // TypeIn
      0, // Sp3
      ...from1to9, // Text[96]
      ...from1to9,
      ...from1to9,
      ...from1to9,
      ...from1to9,
      ...from1to9,
      ...from1to9,
      ...from1to9,
      ...from1to9,
      '1'.charCodeAt(0),
      '2'.charCodeAt(0),
      '3'.charCodeAt(0),
      '4'.charCodeAt(0),
      '5'.charCodeAt(0),
      '$'.charCodeAt(0),
    ]);
    const packet = new IS_BTT(buffer);

    expect(packet.Size).toEqual(104);
    expect(packet.Type).toEqual(PacketType.ISP_BTT);
    expect(packet.ReqI).toEqual(1);
    expect(packet.UCID).toEqual(2);
    expect(packet.ClickID).toEqual(3);
    expect(packet.Inst).toEqual(128);
    expect(packet.TypeIn).toEqual(7);
    expect(packet.Sp3).toEqual(0);
    expect(packet.Text).toEqual(
      '123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 12345$',
    );
  });
});
