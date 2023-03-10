import type { PacketTestData } from '../../utils/tests';
import {
  stringToBytes,
  testInfoPacket,
  testInstructionPacket,
} from '../../utils/tests';
import type { IS_SSH_Data } from '..';
import { IS_SSH, PacketType, ScreenshotError } from '..';

const size = 40;

const name = 'Lorem ipsum dolor sit amet, con';

const instructionData: IS_SSH_Data = {
  ReqI: 2,
  Name: name,
};

const instructionBuffer = new Uint8Array([
  size / new IS_SSH().SIZE_MULTIPLIER, // Size
  49, // Type
  2, // ReqI
  0, // Error
  0, // Sp0
  0, // Sp1
  0, // Sp2
  0, // Sp3
  ...stringToBytes(name), // Name[32]
  0,
]);

const infoData: Partial<Omit<PacketTestData<IS_SSH>, 'ReqI'>> &
  Pick<IS_SSH, 'ReqI'> = {
  ReqI: 2,
  Error: ScreenshotError.SSH_NO_SAVE,
  Name: name,
};

const infoBuffer = new Uint8Array([
  size / new IS_SSH().SIZE_MULTIPLIER, // Size
  49, // Type
  2, // ReqI
  3, // Error
  0, // Sp0
  0, // Sp1
  0, // Sp2
  0, // Sp3
  ...stringToBytes(name), // Name[32]
  0,
]);

describe('IS_SSH', () => {
  testInstructionPacket({
    packetClass: IS_SSH,
    size,
    type: PacketType.ISP_SSH,
    data: instructionData,
    buffer: instructionBuffer,
  });

  testInfoPacket({
    packetClass: IS_SSH,
    size,
    type: PacketType.ISP_SSH,
    data: infoData,
    buffer: infoBuffer,
  });

  it('should throw a range error if ReqI is 0', () => {
    expect(() => {
      new IS_SSH({ ReqI: 0 }).pack();
    }).toThrow(RangeError);
  });
});
