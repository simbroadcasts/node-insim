import { testInstructionPacket } from '../../utils/tests';
import type { IS_JRR_Data } from '..';
import { IS_JRR, JRRAction, ObjectInfo, PacketType } from '..';
import { AbstractPacket } from '../base';

const size = 16;

const data: IS_JRR_Data = {
  PLID: 3,
  UCID: 2,
  JRRAction: JRRAction.JRR_SPAWN,
  StartPos: new ObjectInfo({
    X: -9556,
    Y: -30695,
    Zbyte: 12,
    Flags: 0x80,
    Index: 0,
    Heading: 67,
  }),
};

const buffer = Buffer.from([
  size / AbstractPacket.SIZE_MULTIPLIER, // Size
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
