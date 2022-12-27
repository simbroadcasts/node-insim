import { checkPacketDataSize, stringToBytes } from '../../utils';
import type { IS_MSX_Data } from '..';
import { IS_MSX, PacketType } from '..';
import { BasePacket } from '../BasePacket';

describe('IS_MSX', () => {
  checkPacketDataSize(new IS_MSX());

  it('should fill data from the constructor', () => {
    const data: IS_MSX_Data = {
      Msg: 'You know that this is a very long text message whose length can be up to ninety five characters',
    };
    const packet = new IS_MSX(data);

    expect(packet.Msg).toEqual(data.Msg);
  });

  it('should pack data into a buffer', () => {
    const data: IS_MSX_Data = {
      Msg: 'You know that this is a very long text message whose length can be up to ninety five characters',
    };
    const expectedBuffer = Buffer.from([
      100 / BasePacket.SIZE_MULTIPLIER, // Size
      PacketType.ISP_MSX, // Type
      0, // ReqI
      0, // Zero
      ...stringToBytes(data.Msg),
      0,
    ]);
    const actualBuffer = new IS_MSX(data).pack();

    expect(actualBuffer).toEqual(expectedBuffer);
  });
});
