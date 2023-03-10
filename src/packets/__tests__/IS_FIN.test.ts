import type { PacketTestData } from '../../utils/tests';
import { testInfoPacket } from '../../utils/tests';
import { ConfirmationFlags, IS_FIN, PacketType, PlayerFlags } from '..';

const size = 20;

const data: PacketTestData<IS_FIN> = {
  ReqI: 0,
  PLID: 3,
  TTime: 132241,
  BTime: 14401,
  SpA: 0,
  NumStops: 1,
  Confirm:
    ConfirmationFlags.CONF_CONFIRMED |
    ConfirmationFlags.CONF_PENALTY_DT |
    ConfirmationFlags.CONF_PENALTY_30,
  SpB: 0,
  LapsDone: 68,
  Flags: PlayerFlags.PIF_AUTOGEARS | PlayerFlags.PIF_LEFTSIDE,
};

const buffer = new Uint8Array([
  size / new IS_FIN().SIZE_MULTIPLIER, // Size
  34, // Type
  0, // ReqI
  3, // PLID
  145, // TTime (1)
  4, // TTime (2)
  2, // TTime (3)
  0, // TTime (4)
  65, // BTime (1)
  56, // BTime (2)
  0, // BTime (3)
  0, // BTime (4)
  0, // SpA
  1, // NumStops
  22, // Confirm
  0, // SpB
  68, // LapsDone (1)
  0, // LapsDone (2)
  9, // Flags (1)
  0, // Flags (2)
]);

describe('IS_FIN', () => {
  testInfoPacket({
    packetClass: IS_FIN,
    size,
    type: PacketType.ISP_FIN,
    data,
    buffer,
  });
});
