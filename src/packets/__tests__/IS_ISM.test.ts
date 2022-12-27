import type { PacketTestData } from '../../utils';
import { stringToBytes, testInfoPacket } from '../../utils';
import { IS_ISM, MultiplayerHostMode, PacketType } from '..';
import { AbstractPacket } from '../AbstractPacket';

const size = 40;

const hostName = 'Very Long Server Name Is Longest';

const data: PacketTestData<IS_ISM> = {
  ReqI: 1,
  Zero: 0,
  Sp1: 0,
  Sp2: 0,
  Sp3: 0,
  Host: MultiplayerHostMode.HOST,
  HName: hostName,
};

const buffer = Buffer.from([
  size / AbstractPacket.SIZE_MULTIPLIER, // Size
  10, // Type
  1, // ReqI
  0, // Zero
  1, // Host
  0, // Sp1
  0, // Sp2
  0, // Sp3
  ...stringToBytes(hostName), // HName[32]
]);

describe('IS_ISM', () => {
  testInfoPacket({
    packetClass: IS_ISM,
    size,
    type: PacketType.ISP_ISM,
    data,
    buffer,
  });
});
