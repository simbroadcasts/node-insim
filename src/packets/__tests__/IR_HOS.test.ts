import type { PacketTestData } from '../../utils/tests';
import { stringToBytes, testInfoPacket } from '../../utils/tests';
import { HInfo, HostInfoFlags, IR_HOS, PacketType } from '..';

const size = 4 + 3 * 40;

const data: PacketTestData<IR_HOS> = {
  ReqI: 2,
  NumHosts: 3,
  Info: [
    new HInfo({
      HName: 'SAVAGE SimSports',
      Track: 'AS4X',
      Flags: HostInfoFlags.HOS_S3 | HostInfoFlags.HOS_FIRST,
      NumConns: 10,
    }),
    new HInfo({
      HName: 'New Dimension Racing',
      Track: 'KY3R',
      Flags: HostInfoFlags.HOS_S2,
      NumConns: 32,
    }),
    new HInfo({
      HName: 'Demo Server Whose Name Is Best!!',
      Track: 'BL2',
      Flags: HostInfoFlags.HOS_LAST,
      NumConns: 8,
    }),
  ],
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
