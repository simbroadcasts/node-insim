import type { PacketTestData } from '../tests';
import { testInfoPacket } from '../tests';
import { PacketType, PenaltyReason, PenaltyValue } from './enums';
import { IS_PEN } from './IS_PEN';

const size = 8;

const data: PacketTestData<IS_PEN> = {
  ReqI: 0,
  PLID: 3,
  OldPen: PenaltyValue.PENALTY_DT,
  NewPen: PenaltyValue.PENALTY_DT_VALID,
  Reason: PenaltyReason.PENR_SPEEDING,
};

const buffer = new Uint8Array([
  size / new IS_PEN().SIZE_MULTIPLIER, // Size
  30, // Type
  0, // ReqI
  3, // PLID
  1, // OldPen
  2, // NewPen
  4, // Reason
  0, // Sp3
]);

describe('IS_PEN', () => {
  testInfoPacket({
    packetClass: IS_PEN,
    size,
    type: PacketType.ISP_PEN,
    data,
    buffer,
  });
});
