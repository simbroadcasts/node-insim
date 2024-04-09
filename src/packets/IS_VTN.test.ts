import type { PacketTestData } from '../tests';
import { testInfoPacket } from '../tests';
import { PacketType, VoteAction } from './enums';
import { IS_VTN } from './IS_VTN';

const size = 8;

const data: PacketTestData<IS_VTN> = {
  ReqI: 0,
  Zero: 0,
  UCID: 3,
  Action: VoteAction.VOTE_QUALIFY,
};

const buffer = new Uint8Array([
  size / new IS_VTN().SIZE_MULTIPLIER, // Size
  16, // Type
  0, // ReqI
  0, // Zero
  3, // UCID
  3, // Action
  0, // Spare2
  0, // Spare3
]);

describe('IS_VTN', () => {
  testInfoPacket({
    packetClass: IS_VTN,
    size,
    type: PacketType.ISP_VTN,
    data,
    buffer,
  });
});
