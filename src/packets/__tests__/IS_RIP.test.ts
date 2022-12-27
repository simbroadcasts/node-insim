import { stringToBytes, testSendablePacket } from '../../utils';
import type { IS_RIP_Data } from '..';
import { IS_RIP, PacketType, ReplayError, ReplayMode, ReplayOptions } from '..';
import { AbstractPacket } from '../AbstractPacket';

const replayName =
  'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenea';

const data: IS_RIP_Data = {
  ReqI: 2,
  MPR: ReplayMode.MPR,
  Paused: 1,
  Options: ReplayOptions.RIPOPT_FULL_PHYS | ReplayOptions.RIPOPT_SKINS,
  CTime: 141684,
  RName: replayName,
};

const expectedBuffer = Buffer.from([
  80 / AbstractPacket.SIZE_MULTIPLIER, // Size
  48, // Type
  2, // ReqI
  0, // Error
  1, // MPR
  1, // Paused
  6, // Options
  0, // Sp3
  116, // CTime (1)
  41, // CTime (2)
  2, // CTime (3)
  0, // CTime (4)
  0, // TTime (1)
  0, // TTime (2)
  0, // TTime (3)
  0, // TTime (4)
  ...stringToBytes(replayName),
  0,
]);

describe('IS_RIP', () => {
  testSendablePacket(IS_RIP, 80, PacketType.ISP_RIP, data, expectedBuffer);

  it('should unpack data from a buffer', () => {
    const buffer = Buffer.from([
      80 / AbstractPacket.SIZE_MULTIPLIER, // Size
      48, // Type
      2, // ReqI
      8, // Error
      1, // MPR
      1, // Paused
      6, // Options
      0, // Sp3
      116, // CTime (1)
      41, // CTime (2)
      2, // CTime (3)
      0, // CTime (4)
      32, // TTime (1)
      158, // TTime (2)
      8, // TTime (3)
      0, // TTime (4)
      ...stringToBytes(replayName),
      0,
    ]);

    const packet = new IS_RIP().unpack(buffer);

    expect(packet.Size).toEqual(80);
    expect(packet.Type).toEqual(PacketType.ISP_RIP);
    expect(packet.ReqI).toEqual(2);
    expect(packet.Error).toEqual(ReplayError.RIP_DEST_OOB);
    expect(packet.MPR).toEqual(ReplayMode.MPR);
    expect(packet.Paused).toEqual(1);
    expect(packet.Options).toEqual(
      ReplayOptions.RIPOPT_FULL_PHYS | ReplayOptions.RIPOPT_SKINS,
    );
    expect(packet.Sp3).toEqual(0);
    expect(packet.CTime).toEqual(141684);
    expect(packet.TTime).toEqual(564768);
    expect(packet.RName).toEqual(replayName);
  });
});
