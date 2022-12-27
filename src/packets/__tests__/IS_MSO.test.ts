import { stringToBytes } from '../../utils';
import { IS_MSO, PacketType, UserValues } from '..';
import { BasePacket } from '../BasePacket';

describe('IS_MSO', () => {
  it('should unpack data from a buffer', () => {
    const buffer = Buffer.from([
      24 / BasePacket.SIZE_MULTIPLIER, // Size
      PacketType.ISP_MSO, // Type
      1, // ReqI
      0, // Zero
      2, // UCID
      4, // PLID
      UserValues.MSO_USER, // UserType
      14, // TextStart
      ...stringToBytes('Player : Hello!'), // Msg[128]
      0,
    ]);
    const packet = new IS_MSO().unpack(buffer);

    expect(packet.Size).toEqual(24);
    expect(packet.Type).toEqual(PacketType.ISP_MSO);
    expect(packet.ReqI).toEqual(1);
    expect(packet.Zero).toEqual(0);
    expect(packet.UCID).toEqual(2);
    expect(packet.PLID).toEqual(4);
    expect(packet.UserType).toEqual(UserValues.MSO_USER);
    expect(packet.TextStart).toEqual(14);
    expect(packet.Msg).toEqual('Player : Hello!');
  });
});
