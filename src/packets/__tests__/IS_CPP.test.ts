import type { PacketTestData } from '../../utils/tests';
import { testInfoPacket, testInstructionPacket } from '../../utils/tests';
import type { IS_CPP_Data } from '..';
import { IS_CPP, PacketType, StateFlags, ViewIdentifier } from '..';
import { Packet } from '../base';

const size = 32;

const instructionData: IS_CPP_Data = {
  X: 1,
  Y: 2147483647,
  Z: -2147483648,
  H: 65535,
  P: 456,
  R: 39,
  ViewPLID: 32,
  InGameCam: ViewIdentifier.VIEW_CUSTOM,
  FOV: 40,
  Time: 200,
  Flags: StateFlags.ISS_VIEW_OVERRIDE,
};

const instructionBuffer = Buffer.from([
  size / Packet.SIZE_MULTIPLIER, // Size
  9, // Type
  0, // ReqI
  0, // Zero
  1, // X (1)
  0, // X (2)
  0, // X (3)
  0, // X (4)
  255, // Y (1)
  255, // Y (2)
  255, // Y (3)
  127, // Y (4)
  0, // Z (1)
  0, // Z (2)
  0, // Z (3)
  128, // Z (4)
  255, // H (1)
  255, // H (2)
  200, // P (1)
  1, // P (2)
  39, // R (1)
  0, // R (0)
  32, // ViewPLID
  4, // InGameCam
  0, // FOV (1)
  0, // FOV (2)
  32, // FOV (3)
  66, // FOV (4)
  200, // Time (1)
  0, // Time (2)
  0, // Flags (1)
  32, // Flags (2)
]);

const infoData: PacketTestData<IS_CPP> = {
  ...instructionData,
  ReqI: 2,
  Zero: 0,
};

const infoBuffer = Buffer.from([
  size / Packet.SIZE_MULTIPLIER, // Size
  9, // Type
  2, // ReqI
  0, // Zero
  1, // X (1)
  0, // X (2)
  0, // X (3)
  0, // X (4)
  255, // Y (1)
  255, // Y (2)
  255, // Y (3)
  127, // Y (4)
  0, // Z (1)
  0, // Z (2)
  0, // Z (3)
  128, // Z (4)
  255, // H (1)
  255, // H (2)
  200, // P (1)
  1, // P (2)
  39, // R (1)
  0, // R (0)
  32, // ViewPLID
  4, // InGameCam
  0, // FOV (1)
  0, // FOV (2)
  32, // FOV (3)
  66, // FOV (4)
  200, // Time (1)
  0, // Time (2)
  0, // Flags (1)
  32, // Flags (2)
]);

describe('IS_CPP', () => {
  testInstructionPacket({
    packetClass: IS_CPP,
    size,
    type: PacketType.ISP_CPP,
    data: instructionData,
    buffer: instructionBuffer,
  });
  testInfoPacket({
    packetClass: IS_CPP,
    size,
    type: PacketType.ISP_CPP,
    data: infoData,
    buffer: infoBuffer,
  });
});
