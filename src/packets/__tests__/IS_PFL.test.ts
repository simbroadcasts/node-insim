import { IS_PFL, PacketType, PlayerFlags } from '..';
import { BasePacket } from '../BasePacket';

describe('IS_PFL', () => {
  it('should unpack data from a buffer', () => {
    const buffer = Buffer.from([
      8 / BasePacket.SIZE_MULTIPLIER, // Size
      33, // Type
      0, // ReqI
      3, // PLID
      9, // Flags (1)
      0, // Flags (2)
      0, // Spare (1)
      0, // Spare (2)
    ]);
    const packet = new IS_PFL().unpack(buffer);

    expect(packet.Size).toEqual(8);
    expect(packet.Type).toEqual(PacketType.ISP_PFL);
    expect(packet.ReqI).toEqual(0);
    expect(packet.PLID).toEqual(3);
    expect(packet.Flags).toEqual(
      PlayerFlags.PIF_AUTOGEARS | PlayerFlags.PIF_LEFTSIDE,
    );
    expect(packet.PLID).toEqual(3);
    expect(packet.Spare).toEqual(0);
  });
});
