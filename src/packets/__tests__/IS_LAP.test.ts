import type { PacketTestData } from '../../utils/tests';
import { testInfoPacket } from '../../utils/tests';
import { IS_LAP, PacketType, PenaltyValue, PlayerFlags } from '..';

const size = 20;

const data: PacketTestData<IS_LAP> = {
  ReqI: 0,
  PLID: 2,
  LTime: 16777220,
  ETime: 65600,
  LapsDone: 513,
  Flags: PlayerFlags.PIF_AUTOCLUTCH | PlayerFlags.PIF_HELP_B,
  Penalty: PenaltyValue.PENALTY_45,
  NumStops: 3,
  Fuel200: 40,
};

const buffer = new Uint8Array([
  size / new IS_LAP().SIZE_MULTIPLIER, // Size
  24, // Type
  0, // ReqI
  2, // PLID
  4, // LTime (1)
  0, // LTime (2)
  0, // LTime (3)
  1, // LTime (4)
  64, // ETime (1)
  0, // ETime (2)
  1, // ETime (3)
  0, // ETime (4)
  1, // LapsDone (1)
  2, // LapsDone (2)
  64, // Flags (1)
  2, // Flags (2)
  0, // Sp0
  6, // Penalty
  3, // NumStops
  40, // Fuel200
]);

describe('IS_LAP', () => {
  testInfoPacket({
    packetClass: IS_LAP,
    size,
    type: PacketType.ISP_LAP,
    data,
    buffer,
  });
});
