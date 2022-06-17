import { checkPacketDataSize } from '../../utils';
import type { IS_SMALL_Data } from '..';
import { IS_SMALL, PacketType, SmallType } from '..';
import { BasePacket } from '../BasePacket';

describe('IS_SMALL', () => {
  checkPacketDataSize(new IS_SMALL());

  it('should fill data from the constructor', () => {
    const data: IS_SMALL_Data = {
      ReqI: 1,
      SubT: SmallType.SMALL_NLI,
      UVal: 60,
    };
    const packet = new IS_SMALL(data);

    expect(packet.ReqI).toEqual(data.ReqI);
    expect(packet.SubT).toEqual(data.SubT);
    expect(packet.UVal).toEqual(data.UVal);
  });

  it('should unpack data from a buffer', () => {
    const buffer = Buffer.from([
      8 / BasePacket.SIZE_MULTIPLIER, // Size
      PacketType.ISP_SMALL, // Type
      1, // ReqI
      SmallType.SMALL_RTP, // SubT
      1, // UVal (1)
      1, // UVal (2)
      0, // UVal (3)
      0, // UVal (4)
    ]);
    const packet = new IS_SMALL(buffer);
    expect(packet.Size).toEqual(8);
    expect(packet.Type).toEqual(PacketType.ISP_SMALL);
    expect(packet.ReqI).toEqual(1);
    expect(packet.SubT).toEqual(SmallType.SMALL_RTP);
    expect(packet.UVal).toEqual(257);
  });

  it('should pack data into a buffer', () => {
    const data: IS_SMALL_Data = {
      ReqI: 1,
      SubT: SmallType.SMALL_NLI,
      UVal: 257,
    };
    const actualBuffer = new IS_SMALL(data).pack();
    const expectedBuffer = Buffer.from([
      8 / BasePacket.SIZE_MULTIPLIER, // Size
      PacketType.ISP_SMALL, // Type
      1, // ReqI
      SmallType.SMALL_NLI, // SubT
      1, // UVal (1)
      1, // UVal (2)
      0, // UVal (3)
      0, // UVal (4)
    ]);
    expect(actualBuffer).toEqual(expectedBuffer);
  });
});
