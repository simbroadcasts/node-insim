import { stringToBytes } from '../../utils';
import { IS_RST, PacketType } from '..';
import { BasePacket } from '../BasePacket';
import { RaceFlags } from '../enums';

describe('IS_RST', () => {
  it('should unpack data from a buffer', () => {
    const buffer = Buffer.from([
      28 / BasePacket.SIZE_MULTIPLIER, // Size
      PacketType.ISP_RST, // Type
      1, // ReqI
      0, // Zero
      10, // RaceLaps
      45, // QualMins
      12, // NumP
      66, // Timing
      ...stringToBytes('BL1R'), // Track[6]
      0,
      0,
      2, // Weather
      3, // Wind
      2, // Flags (1)
      1, // Flags (2)
      146, // NumNodes (1)
      1, // NumNodes (2)
      109, // Finish (1)
      1, // Finish (2)
      95, // Split1 (1)
      0, // Split1 (2)
      255, // Split2 (1)
      0, // Split2 (2)
      255, // Split3 (1)
      255, // Split3 (2)
    ]);
    const packet = new IS_RST().unpack(buffer);

    expect(packet.Size).toEqual(28);
    expect(packet.Type).toEqual(PacketType.ISP_RST);
    expect(packet.ReqI).toEqual(1);
    expect(packet.Zero).toEqual(0);
    expect(packet.RaceLaps).toEqual(10);
    expect(packet.QualMins).toEqual(45);
    expect(packet.NumP).toEqual(12);
    expect(packet.Timing).toEqual(66);
    expect(packet.Track).toEqual('BL1R');
    expect(packet.Weather).toEqual(2);
    expect(packet.Wind).toEqual(3);
    expect(packet.Flags).toEqual(
      RaceFlags.HOSTF_CAN_SELECT | RaceFlags.HOSTF_FCV,
    );
    expect(packet.NumNodes).toEqual(402);
    expect(packet.Finish).toEqual(365);
    expect(packet.Split1).toEqual(95);
    expect(packet.Split2).toEqual(255);
    expect(packet.Split3).toEqual(65535);
  });
});
