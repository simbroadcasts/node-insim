import type { PacketTestData } from '../../utils/tests';
import { testInfoPacket } from '../../utils/tests';
import { ButtonClickFlags, IS_BTC, IS_BTN, PacketType } from '..';

const size = 8;

const data: PacketTestData<IS_BTC> = {
  ReqI: 1,
  UCID: 2,
  ClickID: 3,
  Inst: IS_BTN.INST_ALWAYS_ON,
  CFlags: ButtonClickFlags.ISB_RMB,
};

const buffer = new Uint8Array([
  size / new IS_BTC().SIZE_MULTIPLIER, // Size
  46, // Type
  1, // ReqI
  2, // UCID
  3, // ClickID
  128, // Inst
  2, // CFlags
  0, // Sp3
]);

describe('IS_BTC', () => {
  testInfoPacket({
    packetClass: IS_BTC,
    type: PacketType.ISP_BTC,
    size,
    data,
    buffer,
  });
});
