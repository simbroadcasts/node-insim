import { testInstructionPacket } from '../tests';
import { JRRAction, PacketType } from './enums';
import type { IS_JRR_Data } from './IS_JRR';
import { IS_JRR } from './IS_JRR';
import { ObjectInfo } from './structs';

const size = 16;

const data: IS_JRR_Data = {
  PLID: 3,
  UCID: 2,
  JRRAction: JRRAction.JRR_SPAWN,
  StartPos: new ObjectInfo({
    X: -9556,
    Y: -30695,
    Zbyte: 12,
    Flags: 128,
    Index: 0,
    Heading: 67,
  }),
};

const buffer = new Uint8Array([
  size / new IS_JRR().SIZE_MULTIPLIER, // Size
  58, // Type
  0, // ReqI
  3, // PLID
  2, // UCID
  1, // JRRAction
  0, // Sp2
  0, // Sp3
  172, // StartPos - X (1)
  218, // StartPos - X (2)
  25, // StartPos - Y (1)
  136, // StartPos - Y (2)
  12, // StartPos - Zbyte
  0x80, // StartPos - Flags
  0, // StartPos - Index
  67, // StartPos - Heading
]);

describe('IS_JRR', () => {
  testInstructionPacket({
    packetClass: IS_JRR,
    type: PacketType.ISP_JRR,
    size,
    data,
    buffer,
  });
});
