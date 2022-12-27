import type { PacketTestData } from '../../utils';
import { stringToBytes, testInfoPacket } from '../../utils';
import { IS_MSO, PacketType, UserType } from '..';
import { AbstractPacket } from '../AbstractPacket';

const size = 24;

const msg = 'Player : Hello!';

const data: PacketTestData<IS_MSO> = {
  ReqI: 0,
  Zero: 0,
  UCID: 2,
  PLID: 4,
  UserType: UserType.MSO_USER,
  TextStart: 14,
  Msg: msg,
};

const buffer = Buffer.from([
  size / AbstractPacket.SIZE_MULTIPLIER, // Size
  11, // Type
  0, // ReqI
  0, // Zero
  2, // UCID
  4, // PLID
  1, // UserType
  14, // TextStart
  ...stringToBytes(msg), // Msg[128]
  0,
]);

describe('IS_MSO', () => {
  testInfoPacket({
    packetClass: IS_MSO,
    size,
    type: PacketType.ISP_MSO,
    data,
    buffer,
  });
});
