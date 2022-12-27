import { testInstructionPacket } from '../../utils/tests';
import type { IS_PLC_Data } from '..';
import { CarFlags, IS_PLC, PacketType } from '..';
import { AbstractPacket } from '../AbstractPacket';

const size = 12;

const data: IS_PLC_Data = {
  UCID: 13,
  Cars: CarFlags.FOX | CarFlags.LX6 | CarFlags.XRT,
};

const buffer = Buffer.from([
  size / AbstractPacket.SIZE_MULTIPLIER, // Size
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
