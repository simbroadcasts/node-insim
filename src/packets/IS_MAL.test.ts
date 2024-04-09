import type { PacketTestData } from '../tests';
import { testInfoPacket, testInstructionPacket } from '../tests';
import { PacketType } from './enums';
import type { IS_MAL_Data } from './IS_MAL';
import { IS_MAL } from './IS_MAL';

describe('IS_MAL', () => {
  describe('zero mods', () => {
    const size = 8;

    const instructionData: IS_MAL_Data = {
      SkinID: [],
    };

    const instructionBuffer = new Uint8Array([
      size / new IS_MAL().SIZE_MULTIPLIER, // Size
      65, // Type
      0, // ReqI
      0, // NumM
      0, // UCID
      0, // Flags
      0, // Sp2
      0, // Sp3
    ]);

    const infoData: PacketTestData<IS_MAL> = {
      ReqI: 1,
      NumM: 0,
      UCID: 4,
      SkinID: [],
    };

    const infoBuffer = new Uint8Array([
      size / new IS_MAL().SIZE_MULTIPLIER, // Size
      65, // Type
      1, // ReqI
      0, // NumM
      4, // UCID
      0, // Flags
      0, // Sp2
      0, // Sp3
    ]);

    testInstructionPacket({
      packetClass: IS_MAL,
      type: PacketType.ISP_MAL,
      size,
      data: instructionData,
      buffer: instructionBuffer,
    });
    testInfoPacket({
      packetClass: IS_MAL,
      type: PacketType.ISP_MAL,
      size,
      data: infoData,
      buffer: infoBuffer,
    });
  });

  describe('two mods', () => {
    const size = 16;

    const instructionData: IS_MAL_Data = {
      SkinID: ['5882E6', '238F06'],
    };

    const instructionBuffer = new Uint8Array([
      size / new IS_MAL().SIZE_MULTIPLIER, // Size
      65, // Type
      0, // ReqI
      2, // NumM
      0, // UCID
      0, // Flags
      0, // Sp2
      0, // Sp3
      230, // SkinID[0] (1)
      130, // SkinID[0] (2)
      88, // SkinID[0] (3)
      0, // SkinID[0] (4)
      6, // SkinID[1] (1)
      143, // SkinID[1] (2)
      35, // SkinID[1] (3)
      0, // SkinID[1] (4)
    ]);

    const infoData: PacketTestData<IS_MAL> = {
      ReqI: 1,
      NumM: 2,
      UCID: 4,
      SkinID: ['5882E6', '238F06'],
    };

    const infoBuffer = new Uint8Array([
      size / new IS_MAL().SIZE_MULTIPLIER, // Size
      65, // Type
      1, // ReqI
      2, // NumM
      4, // UCID
      0, // Flags
      0, // Sp2
      0, // Sp3
      230, // SkinID[0] (1)
      130, // SkinID[0] (2)
      88, // SkinID[0] (3)
      0, // SkinID[0] (4)
      6, // SkinID[1] (1)
      143, // SkinID[1] (2)
      35, // SkinID[1] (3)
      0, // SkinID[1] (4)
    ]);

    testInstructionPacket({
      packetClass: IS_MAL,
      type: PacketType.ISP_MAL,
      size: 8, // initial size without dynamic part
      data: instructionData,
      buffer: instructionBuffer,
    });
    testInfoPacket({
      packetClass: IS_MAL,
      type: PacketType.ISP_MAL,
      size,
      data: infoData,
      buffer: infoBuffer,
    });
  });
});
