import { testSendablePacket } from '../../utils';
import type { IS_REO_Data } from '..';
import { IS_REO, PacketType } from '..';
import { AbstractPacket } from '../AbstractPacket';

const data: IS_REO_Data = {
  NumP: 10,
  PLID: [
    1, 3, 6, 2, 20, 9, 5, 12, 7, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
};

const buffer = Buffer.from([
  44 / AbstractPacket.SIZE_MULTIPLIER, // Size
  36, // Type
  0, // ReqI
  10, // NumP
  1, // PLID[40]
  3,
  6,
  2,
  20,
  9,
  5,
  12,
  7,
  4,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
]);

describe('IS_REO', () => {
  testSendablePacket(IS_REO, 44, PacketType.ISP_REO, data, buffer);

  it('should unpack data from a buffer', () => {
    const packet = new IS_REO().unpack(buffer);

    expect(packet.Size).toEqual(44);
    expect(packet.Type).toEqual(PacketType.ISP_REO);
    expect(packet.ReqI).toEqual(0);
    expect(packet.NumP).toEqual(10);
    expect(packet.PLID).toEqual([
      1, 3, 6, 2, 20, 9, 5, 12, 7, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]);
  });
});
