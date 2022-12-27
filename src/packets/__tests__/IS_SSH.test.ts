import { stringToBytes, testSendablePacket } from '../../utils';
import type { IS_SSH_Data } from '..';
import { IS_SSH, PacketType, ScreenshotError } from '..';
import { AbstractPacket } from '../AbstractPacket';

const name = 'Lorem ipsum dolor sit amet, con';

const data: IS_SSH_Data = {
  ReqI: 2,
  Name: name,
};

const expectedBuffer = Buffer.from([
  40 / AbstractPacket.SIZE_MULTIPLIER, // Size
  49, // Type
  2, // ReqI
  0, // Error
  0, // Sp0
  0, // Sp1
  0, // Sp2
  0, // Sp3
  ...stringToBytes(name), // Name[32]
  0,
]);

describe('IS_SSH', () => {
  testSendablePacket(IS_SSH, 40, PacketType.ISP_SSH, data, expectedBuffer);

  it('should unpack data from a buffer', () => {
    const buffer = Buffer.from([
      40 / AbstractPacket.SIZE_MULTIPLIER, // Size
      49, // Type
      2, // ReqI
      3, // Error
      0, // Sp0
      0, // Sp1
      0, // Sp2
      0, // Sp3
      ...stringToBytes(name), // Name[32]
      0,
    ]);

    const packet = new IS_SSH().unpack(buffer);

    expect(packet.Size).toEqual(40);
    expect(packet.Type).toEqual(PacketType.ISP_SSH);
    expect(packet.ReqI).toEqual(2);
    expect(packet.Error).toEqual(ScreenshotError.SSH_NO_SAVE);
    expect(packet.Sp0).toEqual(0);
    expect(packet.Sp1).toEqual(0);
    expect(packet.Sp2).toEqual(0);
    expect(packet.Sp3).toEqual(0);
    expect(packet.Name).toEqual(name);
  });
});
