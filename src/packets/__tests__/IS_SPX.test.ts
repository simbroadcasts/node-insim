import type { PacketTestData } from '../../utils/tests';
import { testInfoPacket } from '../../utils/tests';
import { IS_SPX, PacketType, PenaltyValue } from '..';
import { AbstractPacket } from '../AbstractPacket';

const size = 20;

const data: PacketTestData<IS_SPX> = {
  ReqI: 0,
  PLID: 2,
  STime: 16777220,
  ETime: 65600,
  Split: 3,
  Penalty: PenaltyValue.PENALTY_45,
  NumStops: 3,
  Fuel200: 40,
};

const buffer = Buffer.from([
  size / AbstractPacket.SIZE_MULTIPLIER, // Size
  25, // Type
  0, // ReqI
  2, // PLID
  4, // STime (1)
  0, // STime (2)
  0, // STime (3)
  1, // STime (4)
  64, // ETime (1)
  0, // ETime (2)
  1, // ETime (3)
  0, // ETime (4)
  3, // Split
  6, // Penalty
  3, // NumStops
  40, // Fuel200
]);

describe('IS_SPX', () => {
  testInfoPacket({
    packetClass: IS_SPX,
    size,
    type: PacketType.ISP_SPX,
    data,
    buffer,
  });
});
