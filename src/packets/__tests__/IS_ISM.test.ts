import type { PacketTestData } from '../../utils/tests';
import { stringToBytes, testInfoPacket } from '../../utils/tests';
import { IS_ISM, MultiplayerHostMode, PacketType } from '..';

const size = 40;

const hostName = 'Very Long Server Name Is Longest';

const data: PacketTestData<IS_ISM> = {
  ReqI: 1,
  Zero: 0,
  Host: MultiplayerHostMode.HOST,
  HName: hostName,
};

const buffer = new Uint8Array([
  size / new IS_ISM().SIZE_MULTIPLIER, // Size
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
