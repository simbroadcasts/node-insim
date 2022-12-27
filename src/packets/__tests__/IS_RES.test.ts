import { stringToBytes } from '../../utils';
import { ConfirmationFlags, IS_RES, PacketType, PlayerFlags } from '..';
import { BasePacket } from '../BasePacket';

describe('IS_RES', () => {
  it('should unpack data from a buffer', () => {
    const buffer = Buffer.from([
      84 / BasePacket.SIZE_MULTIPLIER, // Size
      35, // Type
      0, // ReqI
      3, // PLID
      ...stringToBytes('123456789 123456789 user'), // UName[24]
      ...stringToBytes('123456789 123456789 play'), // PName[24]
      ...stringToBytes('12345678'), // Plate[8]
      ...stringToBytes('XRT_'), // CName[4]
      234, // TTime (1)
      8, // TTime (2)
      0, // TTime (3)
      4, // TTime (4)
      128, // BTime (1)
      2, // BTime (2)
      1, // BTime (3)
      1, // BTime (4)
      0, // SpA
      2, // NumStops
      5, // Confirm
      0, // SpB
      68, // LapsDone (1)
      0, // LapsDone (2)
      9, // Flags (1)
      0, // Flags (2)
      12, // ResultNum
      22, // NumRes
      6, // PSeconds (1)
      0, // PSeconds (2)
    ]);
    const packet = new IS_RES().unpack(buffer);

    expect(packet.Size).toEqual(84);
    expect(packet.Type).toEqual(PacketType.ISP_RES);
    expect(packet.ReqI).toEqual(0);
    expect(packet.PLID).toEqual(3);
    expect(packet.UName).toEqual('123456789 123456789 user');
    expect(packet.PName).toEqual('123456789 123456789 play');
    expect(packet.Plate).toEqual('12345678');
    expect(packet.CName).toEqual('XRT_');
    expect(packet.TTime).toEqual(67111146);
    expect(packet.BTime).toEqual(16843392);
    expect(packet.SpA).toEqual(0);
    expect(packet.NumStops).toEqual(2);
    expect(packet.Confirm).toEqual(
      ConfirmationFlags.CONF_PENALTY_DT | ConfirmationFlags.CONF_MENTIONED,
    );
    expect(packet.SpB).toEqual(0);
    expect(packet.LapsDone).toEqual(68);
    expect(packet.Flags).toEqual(
      PlayerFlags.PIF_AUTOGEARS | PlayerFlags.PIF_LEFTSIDE,
    );
    expect(packet.ResultNum).toEqual(12);
    expect(packet.NumRes).toEqual(22);
    expect(packet.PSeconds).toEqual(6);
  });
});
