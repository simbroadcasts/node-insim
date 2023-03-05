import { testInstructionPacket } from '../../utils/tests';
import type { IS_TTC_Data } from '..';
import { IS_TTC, PacketType, TargetToConnectionType } from '..';

const size = 8;

const data: IS_TTC_Data = {
  ReqI: 7,
  SubT: TargetToConnectionType.TTC_SEL_START,
  UCID: 5,
  B1: 1,
  B2: 2,
  B3: 3,
};

const buffer = Buffer.from([
  size / new IS_TTC().SIZE_MULTIPLIER, // Size
  61, // Type
  7, // ReqI
  2, // SubT
  5, // UCID
  1, // B1
  2, // B2
  3, // B3
]);

describe('IS_TTC', () => {
  testInstructionPacket({
    packetClass: IS_TTC,
    type: PacketType.ISP_TTC,
    size,
    data,
    buffer,
  });
});
