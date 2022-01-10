import { checkPacketDataSize } from '../../utils/testutils';
import { BasePacket } from '../BasePacket';
import { IS_TINY, IS_TINY_Data, TinyType } from '../IS_TINY';
import { PacketType } from '../packetTypes';

describe('IS_TINY', () => {
  checkPacketDataSize(new IS_TINY());

  it('should fill data from the constructor', () => {
    const data: IS_TINY_Data = {
      ReqI: 1,
      SubT: TinyType.TINY_CLOSE,
    };
    const packet = new IS_TINY(data);

    expect(packet.ReqI).toEqual(data.ReqI);
    expect(packet.SubT).toEqual(data.SubT);
  });

  it('should unpack data from a buffer', () => {
    const buffer = Buffer.from([
      5, // Size
      PacketType.ISP_TINY, // Type
      1, // ReqI
      TinyType.TINY_CLOSE, // SubT
    ]);
    const packet = new IS_TINY(buffer);
    expect(packet.Size).toEqual(20);
    expect(packet.Type).toEqual(PacketType.ISP_TINY);
    expect(packet.ReqI).toEqual(1);
    expect(packet.SubT).toEqual(TinyType.TINY_CLOSE);
  });

  it('should pack data into a buffer', () => {
    const data: IS_TINY_Data = {
      ReqI: 1,
      SubT: TinyType.TINY_CLOSE,
    };
    const buffer = new IS_TINY(data).pack();

    expect(
      buffer.equals(
        Buffer.from([
          4 / BasePacket.SIZE_MULTIPLIER, // Size
          PacketType.ISP_TINY, // Type
          1, // ReqI
          TinyType.TINY_CLOSE, // SubT
        ]),
      ),
    ).toEqual(true);
  });
});
