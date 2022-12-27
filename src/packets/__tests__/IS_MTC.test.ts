import { checkPacketDataSize, stringToBytes } from '../../utils';
import type { IS_MTC_Data } from '..';
import { IS_MTC, PacketType } from '..';
import { BasePacket } from '../BasePacket';
import { MessageSound } from '../enums/MessageSound';

const text =
  'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque pe';

describe('IS_MTC', () => {
  checkPacketDataSize(new IS_MTC());

  it('should fill data from the constructor', () => {
    const data: IS_MTC_Data = {
      Sound: MessageSound.SND_INVALIDKEY,
      UCID: 1,
      PLID: 2,
      Text: text,
    };
    const packet = new IS_MTC(data);

    expect(packet.Type).toEqual(PacketType.ISP_MTC);
    expect(packet.ReqI).toEqual(0);
    expect(packet.Sound).toEqual(MessageSound.SND_INVALIDKEY);
    expect(packet.UCID).toEqual(1);
    expect(packet.PLID).toEqual(2);
    expect(packet.Sp2).toEqual(0);
    expect(packet.Sp3).toEqual(0);
    expect(packet.Text).toEqual(text);
  });

  it('should pack data into a buffer', () => {
    const data: IS_MTC_Data = {
      Sound: MessageSound.SND_INVALIDKEY,
      UCID: 1,
      PLID: 2,
      Text: text,
    };
    const expectedBuffer = Buffer.from([
      136 / BasePacket.SIZE_MULTIPLIER, // Size
      PacketType.ISP_MTC, // Type
      0, // ReqI
      3, // Sound
      1, // UCID
      2, // PLID
      0, // Sp2
      0, // Sp3
      ...stringToBytes(text), // Text
      0,
    ]);
    const actualBuffer = new IS_MTC(data).pack();

    expect(actualBuffer).toEqual(expectedBuffer);
  });

  it('should allocate 4 bytes for en empty text value', () => {
    const data: IS_MTC_Data = {
      Sound: MessageSound.SND_INVALIDKEY,
      UCID: 1,
      PLID: 2,
      Text: '',
    };
    const expectedBuffer = Buffer.from([
      12 / BasePacket.SIZE_MULTIPLIER, // Size
      PacketType.ISP_MTC, // Type
      0, // ReqI
      3, // Sound
      1, // UCID
      2, // PLID
      0, // Sp2
      0, // Sp3
      ''.charCodeAt(0), // Text (4)
      0,
      0,
      0,
    ]);
    const actualBuffer = new IS_MTC(data).pack();

    expect(actualBuffer).toEqual(expectedBuffer);
  });
});
