import type { PacketTestData } from '../tests';
import { testInfoPacket } from '../tests';
import { PacketType } from './enums';
import { IS_PLA, PitLaneFact } from './IS_PLA';

const size = 8;

const data: PacketTestData<IS_PLA> = {
  ReqI: 0,
  PLID: 3,
  Fact: PitLaneFact.PITLANE_SG,
};

const buffer = new Uint8Array([
  size / new IS_PLA().SIZE_MULTIPLIER, // Size
  28, // Type
  0, // ReqI
  3, // PLID
  4, // Fact
  0, // Sp1
  0, // Sp2
  0, // Sp3
]);

describe('IS_PLA', () => {
  testInfoPacket({
    packetClass: IS_PLA,
    size,
    type: PacketType.ISP_PLA,
    data,
    buffer,
  });
});
