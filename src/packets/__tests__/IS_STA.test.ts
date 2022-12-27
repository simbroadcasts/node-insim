import { stringToBytes } from '../../utils';
import {
  IS_STA,
  PacketType,
  RaceState,
  ServerStatus,
  StateFlags,
  ViewIdentifier,
  Wind,
} from '..';
import { AbstractPacket } from '../AbstractPacket';

describe('IS_STA', () => {
  it('should unpack data from a buffer', () => {
    const buffer = Buffer.from([
      28 / AbstractPacket.SIZE_MULTIPLIER, // Size
      5, // Type
      1, // ReqI
      0, // Zero
      0, // ReplaySpeed (1)
      0, // ReplaySpeed (2)
      128, // ReplaySpeed (3)
      62, // ReplaySpeed (4)
      8, // Flags (1)
      0, // Flags (2)
      3, // InGameCam
      4, // ViewPLID
      32, // NumP
      47, // NumConns
      20, // NumFinished
      2, // RaceInProg
      60, // QualMins
      12, // RaceLaps
      0, // Sp2
      1, // ServerStatus
      ...stringToBytes('BL2R'), // Track[6]
      0,
      0,
      1, // Weather
      2, // Wind
    ]);
    const packet = new IS_STA().unpack(buffer);

    expect(packet.Size).toEqual(28);
    expect(packet.Type).toEqual(PacketType.ISP_STA);
    expect(packet.ReqI).toEqual(1);
    expect(packet.Zero).toEqual(0);
    expect(packet.ReplaySpeed).toEqual(0.25);
    expect(packet.Flags).toEqual(StateFlags.ISS_SHIFTU);
    expect(packet.InGameCam).toEqual(ViewIdentifier.VIEW_DRIVER);
    expect(packet.ViewPLID).toEqual(4);
    expect(packet.NumP).toEqual(32);
    expect(packet.NumConns).toEqual(47);
    expect(packet.NumFinished).toEqual(20);
    expect(packet.RaceInProg).toEqual(RaceState.Qualifying);
    expect(packet.QualMins).toEqual(60);
    expect(packet.RaceLaps).toEqual(12);
    expect(packet.Sp2).toEqual(0);
    expect(packet.ServerStatus).toEqual(ServerStatus.Success);
    expect(packet.Track).toEqual('BL2R');
    expect(packet.Weather).toEqual(1);
    expect(packet.Wind).toEqual(Wind.Strong);
  });
});
