import { checkPacketDataSize, stringToBytes } from '../../utils';
import type { IS_MST_Data } from '..';
import { IS_MST, PacketType } from '..';
import { BasePacket } from '../BasePacket';

const data: IS_MST_Data = {
  Msg: 'This is a message whose length will be sixty four characters ye',
};

const expectedBuffer = Buffer.from([
  68 / BasePacket.SIZE_MULTIPLIER, // Size
  PacketType.ISP_MST, // Type
  0, // ReqI
  0, // Zero
  ...stringToBytes(data.Msg),
  0,
]);

describe('IS_MST', () => {
  checkPacketDataSize(new IS_MST());

  it('should fill data from the constructor', () => {
    const packet = new IS_MST(data);

    expect(packet.Type).toEqual(PacketType.ISP_MST);
    expect(packet.ReqI).toEqual(0);
    expect(packet.Zero).toEqual(0);
    expect(packet.Msg).toEqual(data.Msg);
  });

  it('should pack data into a buffer', () => {
    const actualBuffer = new IS_MST(data).pack();

    expect(actualBuffer).toEqual(expectedBuffer);
  });
});
