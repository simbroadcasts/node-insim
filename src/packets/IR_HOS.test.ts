import type { PacketTestData } from '../tests';
import { stringToBytes, testInfoPacket } from '../tests';
import { HostInfoFlags, PacketType } from './enums';
import { IR_HOS } from './IR_HOS';
import { HInfo } from './structs';

const size = 4 + 3 * 40;

const hInfo1 = new HInfo({
  HName: 'SAVAGE SimSports',
  Track: 'AS4X',
  Flags: HostInfoFlags.HOS_S3 | HostInfoFlags.HOS_FIRST,
  NumConns: 10,
});
hInfo1._raw.HName = 'SAVAGE SimSports\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0';
hInfo1._raw.Track = 'AS4X\0\0';

const hInfo2 = new HInfo({
  HName: 'New Dimension Racing',
  Track: 'KY3R',
  Flags: HostInfoFlags.HOS_S2,
  NumConns: 32,
});
hInfo2._raw.HName = 'New Dimension Racing\0\0\0\0\0\0\0\0\0\0\0\0';
hInfo2._raw.Track = 'KY3R\0\0';

const hInfo3 = new HInfo({
  HName: 'Demo Server Whose Name Is Best!!',
  Track: 'BL2',
  Flags: HostInfoFlags.HOS_LAST,
  NumConns: 8,
});
hInfo3._raw.HName = 'Demo Server Whose Name Is Best!!';
hInfo3._raw.Track = 'BL2\0\0\0';

const data: PacketTestData<IR_HOS> = {
  ReqI: 2,
  NumHosts: 3,
  Info: [hInfo1, hInfo2, hInfo3],
};

const buffer = new Uint8Array([
  size / new IR_HOS().SIZE_MULTIPLIER, // Size
  253, // Type
  2, // ReqI
  3, // NumHosts

  ...stringToBytes('SAVAGE SimSports'), // Info[0] - HName[32]
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  ...stringToBytes('AS4X'), // Info[0] - Track[6]
  0,
  0,
  80, // Info[0] - Flags
  10, // Info[0] - NumConns

  ...stringToBytes('New Dimension Racing'), // Info[0] - HName[32]
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  ...stringToBytes('KY3R'), // Info[0] - Track[6]
  0,
  0,
  8, // Info[0] - Flags
  32, // Info[0] - NumConns

  ...stringToBytes('Demo Server Whose Name Is Best!!'), // Info[0] - HName[32]
  ...stringToBytes('BL2'), // Info[0] - Track[6]
  0,
  0,
  0,
  128, // Info[0] - Flags
  8, // Info[0] - NumConns
]);

describe('IR_HOS', () => {
  testInfoPacket({
    packetClass: IR_HOS,
    type: PacketType.IRP_HOS,
    size,
    data,
    buffer,
  });
});
