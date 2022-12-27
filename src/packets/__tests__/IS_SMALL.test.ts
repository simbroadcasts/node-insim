import { testSendablePacket } from '../../utils';
import type { IS_SMALL_Data } from '..';
import { IS_SMALL, PacketType, SmallType } from '..';
import { BasePacket } from '../BasePacket';

const data: IS_SMALL_Data = {
  ReqI: 1,
  SubT: SmallType.SMALL_NLI,
  UVal: 257,
};

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

describe('IS_SMALL', () => {
  testSendablePacket(IS_SMALL, 8, PacketType.ISP_SMALL, data, expectedBuffer);

  it('should unpack data from a buffer', () => {
    const packet = new IS_SMALL().unpack(expectedBuffer);
    expect(packet.Size).toEqual(8);
    expect(packet.Type).toEqual(PacketType.ISP_SMALL);
    expect(packet.ReqI).toEqual(1);
    expect(packet.SubT).toEqual(SmallType.SMALL_NLI);
    expect(packet.UVal).toEqual(257);
  });
});
