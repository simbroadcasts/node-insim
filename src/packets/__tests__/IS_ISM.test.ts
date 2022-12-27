import { stringToBytes } from '../../utils';
import { IS_ISM, MultiplayerHostMode, PacketType } from '..';
import { BasePacket } from '../BasePacket';

describe('IS_ISM', () => {
  it('should unpack data from a buffer', () => {
    const buffer = Buffer.from([
      40 / BasePacket.SIZE_MULTIPLIER, // Size
      PacketType.ISP_ISM, // Type
      1, // ReqI
      0, // Zero
      MultiplayerHostMode.HOST, // Host
      0, // Sp1
      0, // Sp2
      0, // Sp3
      ...stringToBytes('Very Long Server Name Is Longest'), // HName[32]
    ]);
    const packet = new IS_ISM().unpack(buffer);

    expect(packet.Size).toEqual(40);
    expect(packet.Type).toEqual(PacketType.ISP_ISM);
    expect(packet.ReqI).toEqual(1);
    expect(packet.Zero).toEqual(0);
    expect(packet.Sp1).toEqual(0);
    expect(packet.Sp2).toEqual(0);
    expect(packet.Sp3).toEqual(0);
    expect(packet.Host).toEqual(MultiplayerHostMode.HOST);
    expect(packet.HName).toEqual('Very Long Server Name Is Longest');
  });
});
