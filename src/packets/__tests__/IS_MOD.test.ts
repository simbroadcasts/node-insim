import { checkPacketDataSize } from '../../utils';
import type { IS_MOD_Data } from '..';
import { IS_MOD, PacketType } from '..';
import { BasePacket } from '../BasePacket';

const data: IS_MOD_Data = {
  Bits16: 2,
  RR: 59,
  Width: 1920,
  Height: 1080,
};

const expectedBuffer = Buffer.from([
  20 / BasePacket.SIZE_MULTIPLIER, // Size
  PacketType.ISP_MOD, // Type
  0, // ReqI
  0, // Zero
  2, // Bits16 (1)
  0, // Bits16 (2)
  0, // Bits16 (3)
  0, // Bits16 (4)
  59, // RR (1)
  0, // RR (2)
  0, // RR (3)
  0, // RR (4)
  128, // Width (1)
  7, // Width (2)
  0, // Width (3)
  0, // Width (4)
  56, // Height (1)
  4, // Height (2)
  0, // Height (3)
  0, // Height (4)
]);

describe('IS_MOD', () => {
  checkPacketDataSize(new IS_MOD());

  it('should fill data from the constructor', () => {
    const packet = new IS_MOD(data);

    expect(packet.Size).toEqual(20);
    expect(packet.Type).toEqual(PacketType.ISP_MOD);
    expect(packet.ReqI).toEqual(0);
    expect(packet.Zero).toEqual(0);
    expect(packet.Bits16).toEqual(data.Bits16);
    expect(packet.RR).toEqual(data.RR);
    expect(packet.Width).toEqual(data.Width);
    expect(packet.Height).toEqual(data.Height);
  });

  it('should pack data into a buffer', () => {
    const actualBuffer = new IS_MOD(data).pack();

    expect(actualBuffer).toEqual(expectedBuffer);
  });
});
