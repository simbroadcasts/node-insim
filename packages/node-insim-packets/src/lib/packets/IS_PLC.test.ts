import { CarFlags, PacketType } from '../enums/index.js';
import { testInstructionPacket } from '../tests';
import type { IS_PLC_Data } from './IS_PLC.js';
import { IS_PLC } from './IS_PLC.js';

const size = 12;

const data: IS_PLC_Data = {
  UCID: 13,
  Cars: CarFlags.FOX | CarFlags.LX6 | CarFlags.XRT,
};

const buffer = new Uint8Array([
  size / new IS_PLC().SIZE_MULTIPLIER, // Size
  53, // Type
  0, // ReqI
  0, // Zero
  13, // UCID
  0, // Sp1
  0, // Sp2
  0, // Sp3
  68, // CarFlags (1)
  8, // CarFlags (2)
  0, // CarFlags (3)
  0, // CarFlags (4)
]);

describe('IS_PLC', () => {
  testInstructionPacket({
    packetClass: IS_PLC,
    size,
    type: PacketType.ISP_PLC,
    data,
    buffer,
  });
});
