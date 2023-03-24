import type { PacketTestData } from '../../tests';
import { testInfoPacket } from '../../tests';
import { FlagType, IS_FLG, PacketType } from '..';

const size = 8;

const data: PacketTestData<IS_FLG> = {
  ReqI: 0,
  PLID: 3,
  OffOn: 1,
  Flag: FlagType.YELLOW,
  CarBehind: 14,
};

const buffer = new Uint8Array([
  size / new IS_FLG().SIZE_MULTIPLIER, // Size
  32, // Type
  0, // ReqI
  3, // PLID
  1, // OffOn
  2, // Flag
  14, // CarBehind
  0, // Sp3
]);

describe('IS_FLG', () => {
  testInfoPacket({
    packetClass: IS_FLG,
    size,
    type: PacketType.ISP_FLG,
    buffer,
    data,
  });
});
