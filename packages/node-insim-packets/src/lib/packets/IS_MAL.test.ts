import { PacketType } from '../enums/index.js';
import type { PacketTestData } from '../tests';
import { testInfoPacket, testInstructionPacket } from '../tests';
import type { IS_MAL_Data } from './IS_MAL.js';
import { IS_MAL } from './IS_MAL.js';

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

  describe('SkinID limit', () => {
    it('should not throw a RangeError if 120 SkinIDs are provided', () => {
      expect(() =>
        new IS_MAL({
          SkinID: [
            '000001',
            '000002',
            '000003',
            '000004',
            '000005',
            '000006',
            '000007',
            '000008',
            '000009',
            '000010',
            '000011',
            '000012',
            '000013',
            '000014',
            '000015',
            '000016',
            '000017',
            '000018',
            '000019',
            '000020',
            '000021',
            '000022',
            '000023',
            '000024',
            '000025',
            '000026',
            '000027',
            '000028',
            '000029',
            '000030',
            '000031',
            '000032',
            '000033',
            '000034',
            '000035',
            '000036',
            '000037',
            '000038',
            '000039',
            '000040',
            '000041',
            '000042',
            '000043',
            '000044',
            '000045',
            '000046',
            '000047',
            '000048',
            '000049',
            '000050',
            '000051',
            '000052',
            '000053',
            '000054',
            '000055',
            '000056',
            '000057',
            '000058',
            '000059',
            '000060',
            '000061',
            '000062',
            '000063',
            '000064',
            '000065',
            '000066',
            '000067',
            '000068',
            '000069',
            '000070',
            '000071',
            '000072',
            '000073',
            '000074',
            '000075',
            '000076',
            '000077',
            '000078',
            '000079',
            '000080',
            '000081',
            '000082',
            '000083',
            '000084',
            '000085',
            '000086',
            '000087',
            '000088',
            '000089',
            '000090',
            '000091',
            '000092',
            '000093',
            '000094',
            '000095',
            '000096',
            '000097',
            '000098',
            '000099',
            '000100',
            '000101',
            '000102',
            '000103',
            '000104',
            '000105',
            '000106',
            '000107',
            '000108',
            '000109',
            '000110',
            '000111',
            '000112',
            '000113',
            '000114',
            '000115',
            '000116',
            '000117',
            '000118',
            '000119',
            '000120',
          ],
        }).pack(),
      ).not.toThrowError('');
    });

    it('should throw a RangeError if more than 120 SkinIDs are provided', () => {
      expect(() =>
        new IS_MAL({
          SkinID: [
            '000001',
            '000002',
            '000003',
            '000004',
            '000005',
            '000006',
            '000007',
            '000008',
            '000009',
            '000010',
            '000011',
            '000012',
            '000013',
            '000014',
            '000015',
            '000016',
            '000017',
            '000018',
            '000019',
            '000020',
            '000021',
            '000022',
            '000023',
            '000024',
            '000025',
            '000026',
            '000027',
            '000028',
            '000029',
            '000030',
            '000031',
            '000032',
            '000033',
            '000034',
            '000035',
            '000036',
            '000037',
            '000038',
            '000039',
            '000040',
            '000041',
            '000042',
            '000043',
            '000044',
            '000045',
            '000046',
            '000047',
            '000048',
            '000049',
            '000050',
            '000051',
            '000052',
            '000053',
            '000054',
            '000055',
            '000056',
            '000057',
            '000058',
            '000059',
            '000060',
            '000061',
            '000062',
            '000063',
            '000064',
            '000065',
            '000066',
            '000067',
            '000068',
            '000069',
            '000070',
            '000071',
            '000072',
            '000073',
            '000074',
            '000075',
            '000076',
            '000077',
            '000078',
            '000079',
            '000080',
            '000081',
            '000082',
            '000083',
            '000084',
            '000085',
            '000086',
            '000087',
            '000088',
            '000089',
            '000090',
            '000091',
            '000092',
            '000093',
            '000094',
            '000095',
            '000096',
            '000097',
            '000098',
            '000099',
            '000100',
            '000101',
            '000102',
            '000103',
            '000104',
            '000105',
            '000106',
            '000107',
            '000108',
            '000109',
            '000110',
            '000111',
            '000112',
            '000113',
            '000114',
            '000115',
            '000116',
            '000117',
            '000118',
            '000119',
            '000120',
            '000121',
          ],
        }).pack(),
      ).toThrowError();
    });
  });
});
