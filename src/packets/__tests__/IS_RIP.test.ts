import type { PacketTestData } from '../../utils/tests';
import {
  stringToBytes,
  testInfoPacket,
  testInstructionPacket,
} from '../../utils/tests';
import type { IS_RIP_Data } from '..';
import { IS_RIP, PacketType, ReplayError, ReplayMode, ReplayOptions } from '..';
import { AbstractPacket } from '../base';

const size = 80;

const replayName =
  'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenea';

const instructionData: IS_RIP_Data = {
  ReqI: 2,
  MPR: ReplayMode.MPR,
  Paused: 1,
  Options: ReplayOptions.RIPOPT_FULL_PHYS | ReplayOptions.RIPOPT_SKINS,
  CTime: 141684,
  RName: replayName,
};

const instructionBuffer = Buffer.from([
  size / AbstractPacket.SIZE_MULTIPLIER, // Size
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
  ...stringToBytes(replayName), // RName[64]
  0,
]);

const infoData: Partial<Omit<PacketTestData<IS_RIP>, 'ReqI'>> &
  Pick<IS_RIP, 'ReqI'> = {
  ReqI: 2,
  Error: ReplayError.RIP_DEST_OOB,
  MPR: ReplayMode.MPR,
  Paused: 1,
  Options: ReplayOptions.RIPOPT_FULL_PHYS | ReplayOptions.RIPOPT_SKINS,
  CTime: 141684,
  RName: replayName,
};

const infoBuffer = Buffer.from([
  size / AbstractPacket.SIZE_MULTIPLIER, // Size
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
  ...stringToBytes(replayName), // RName[64]
  0,
]);

describe('IS_RIP', () => {
  testInstructionPacket({
    packetClass: IS_RIP,
    size,
    type: PacketType.ISP_RIP,
    data: instructionData,
    buffer: instructionBuffer,
  });

  testInfoPacket({
    packetClass: IS_RIP,
    size,
    type: PacketType.ISP_RIP,
    data: infoData,
    buffer: infoBuffer,
  });

  it('should throw a range error if ReqI is 0', () => {
    expect(() => {
      new IS_RIP({ ReqI: 0 }).pack();
    }).toThrow(RangeError);
  });
});
