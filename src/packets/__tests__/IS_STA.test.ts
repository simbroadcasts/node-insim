import type { PacketTestData } from '../../utils';
import { stringToBytes, testInfoPacket } from '../../utils';
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

const size = 28;

const data: PacketTestData<IS_STA> = {
  ReqI: 1,
  Zero: 0,
  ReplaySpeed: 0.25,
  Flags: StateFlags.ISS_SHIFTU,
  InGameCam: ViewIdentifier.VIEW_DRIVER,
  ViewPLID: 4,
  NumP: 32,
  NumConns: 47,
  NumFinished: 20,
  RaceInProg: RaceState.Qualifying,
  QualMins: 60,
  RaceLaps: 12,
  Sp2: 0,
  ServerStatus: ServerStatus.Success,
  Track: 'BL2R',
  Weather: 1,
  Wind: Wind.Strong,
};

const buffer = Buffer.from([
  size / AbstractPacket.SIZE_MULTIPLIER, // Size
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

describe('IS_STA', () => {
  testInfoPacket({
    packetClass: IS_STA,
    size,
    type: PacketType.ISP_STA,
    data,
    buffer,
  });
});
