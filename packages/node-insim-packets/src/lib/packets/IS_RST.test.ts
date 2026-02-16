import { PacketType, Wind } from '../enums/index.js';
import type { PacketTestData } from '../tests';
import { stringToBytes, testInfoPacket } from '../tests';
import { IS_RST, RaceFlags } from './IS_RST.js';

const size = 28;

const data: PacketTestData<IS_RST> = {
  ReqI: 1,
  Zero: 0,
  RaceLaps: 10,
  QualMins: 45,
  NumP: 12,
  Timing: 66,
  Track: 'BL1R',
  Weather: 2,
  Wind: Wind.STRONG,
  Flags: RaceFlags.HOSTF_CAN_SELECT | RaceFlags.HOSTF_FCV,
  NumNodes: 402,
  Finish: 365,
  Split1: 95,
  Split2: 255,
  Split3: 65535,
};

const buffer = new Uint8Array([
  size / new IS_RST().SIZE_MULTIPLIER, // Size
  17, // Type
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
  2, // Wind
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

describe('IS_RST', () => {
  testInfoPacket({
    packetClass: IS_RST,
    size,
    type: PacketType.ISP_RST,
    data,
    buffer,
  });
});
