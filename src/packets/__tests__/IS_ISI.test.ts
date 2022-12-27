import { InSim } from '../../protocols';
import { stringToBytes, testSendablePacket } from '../../utils';
import type { IS_ISI_Data } from '..';
import { IS_ISI, PacketType } from '..';
import { BasePacket } from '../BasePacket';

const data: IS_ISI_Data = {
  ReqI: 1,
  UDPPort: 257,
  Flags: 2,
  InSimVer: InSim.INSIM_VERSION,
  Prefix: '!',
  Interval: 30,
  Admin: 'admin adminadmin',
  IName: 'app app app app ',
};

const expectedBuffer = Buffer.from([
  44 / BasePacket.SIZE_MULTIPLIER, // Size
  1, // Type
  1, // ReqI
  0, // Zero
  1, // UDPPort (1)
  1, // UDPPort (2)
  2, // Flags (1)
  0, // flags (2)
  9, // InSimVer
  '!'.charCodeAt(0), // Prefix
  30, // Interval (1)
  0, // Interval (2)
  ...stringToBytes('admin adminadmin'), // Admin[16]
  ...stringToBytes('app app app app '), // IName[16]
]);

describe('IS_ISI', () => {
  testSendablePacket(IS_ISI, 44, PacketType.ISP_ISI, data, expectedBuffer);
});
