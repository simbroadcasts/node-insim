import { testInstructionPacket } from '../../utils/tests';
import type { IS_HCP_Data } from '..';
import { CarHCP, IS_HCP, PacketType } from '..';
import { Packet } from '../base';

const size = 68;

const data: IS_HCP_Data = {
  Info: [
    new CarHCP({
      H_Mass: 10,
      H_TRes: 25,
    }),
    new CarHCP({
      H_Mass: 10,
      H_TRes: 25,
    }),
    new CarHCP({
      H_Mass: 10,
      H_TRes: 25,
    }),
    new CarHCP({
      H_Mass: 10,
      H_TRes: 25,
    }),
    new CarHCP({
      H_Mass: 10,
      H_TRes: 25,
    }),
    new CarHCP({
      H_Mass: 10,
      H_TRes: 25,
    }),
    new CarHCP({
      H_Mass: 10,
      H_TRes: 25,
    }),
    new CarHCP({
      H_Mass: 10,
      H_TRes: 25,
    }),
    new CarHCP({
      H_Mass: 10,
      H_TRes: 25,
    }),
    new CarHCP({
      H_Mass: 10,
      H_TRes: 25,
    }),
    new CarHCP({
      H_Mass: 10,
      H_TRes: 25,
    }),
    new CarHCP({
      H_Mass: 10,
      H_TRes: 25,
    }),
    new CarHCP({
      H_Mass: 10,
      H_TRes: 25,
    }),
    new CarHCP({
      H_Mass: 10,
      H_TRes: 25,
    }),
    new CarHCP({
      H_Mass: 10,
      H_TRes: 25,
    }),
    new CarHCP({
      H_Mass: 10,
      H_TRes: 25,
    }),
    new CarHCP({
      H_Mass: 10,
      H_TRes: 25,
    }),
    new CarHCP({
      H_Mass: 10,
      H_TRes: 25,
    }),
    new CarHCP({
      H_Mass: 10,
      H_TRes: 25,
    }),
    new CarHCP({
      H_Mass: 10,
      H_TRes: 25,
    }),
    new CarHCP({
      H_Mass: 10,
      H_TRes: 25,
    }),
    new CarHCP({
      H_Mass: 10,
      H_TRes: 25,
    }),
    new CarHCP({
      H_Mass: 10,
      H_TRes: 25,
    }),
    new CarHCP({
      H_Mass: 10,
      H_TRes: 25,
    }),
    new CarHCP({
      H_Mass: 10,
      H_TRes: 25,
    }),
    new CarHCP({
      H_Mass: 10,
      H_TRes: 25,
    }),
    new CarHCP({
      H_Mass: 10,
      H_TRes: 25,
    }),
    new CarHCP({
      H_Mass: 10,
      H_TRes: 25,
    }),
    new CarHCP({
      H_Mass: 10,
      H_TRes: 25,
    }),
    new CarHCP({
      H_Mass: 10,
      H_TRes: 25,
    }),
    new CarHCP({
      H_Mass: 10,
      H_TRes: 25,
    }),
    new CarHCP({
      H_Mass: 11,
      H_TRes: 26,
    }),
  ],
};

const buffer = Buffer.from([
  size / Packet.SIZE_MULTIPLIER, // Size
  56, // Type
  0, // ReqI
  0, // Zero
  10, // CarHCP[0] - H_Mass
  25, // CarHCP[0] - H_TRes
  10, // CarHCP[1] - H_Mass
  25, // CarHCP[1] - H_TRes
  10, // CarHCP[2] - H_Mass
  25, // CarHCP[2] - H_TRes
  10, // CarHCP[3] - H_Mass
  25, // CarHCP[3] - H_TRes
  10, // CarHCP[4] - H_Mass
  25, // CarHCP[4] - H_TRes
  10, // CarHCP[5] - H_Mass
  25, // CarHCP[5] - H_TRes
  10, // CarHCP[6] - H_Mass
  25, // CarHCP[6] - H_TRes
  10, // CarHCP[7] - H_Mass
  25, // CarHCP[7] - H_TRes
  10, // CarHCP[8] - H_Mass
  25, // CarHCP[8] - H_TRes
  10, // CarHCP[9] - H_Mass
  25, // CarHCP[9] - H_TRes
  10, // CarHCP[10] - H_Mass
  25, // CarHCP[10] - H_TRes
  10, // CarHCP[11] - H_Mass
  25, // CarHCP[11] - H_TRes
  10, // CarHCP[12] - H_Mass
  25, // CarHCP[12] - H_TRes
  10, // CarHCP[13] - H_Mass
  25, // CarHCP[13] - H_TRes
  10, // CarHCP[14] - H_Mass
  25, // CarHCP[14] - H_TRes
  10, // CarHCP[15] - H_Mass
  25, // CarHCP[15] - H_TRes
  10, // CarHCP[16] - H_Mass
  25, // CarHCP[16] - H_TRes
  10, // CarHCP[17] - H_Mass
  25, // CarHCP[17] - H_TRes
  10, // CarHCP[18] - H_Mass
  25, // CarHCP[18] - H_TRes
  10, // CarHCP[19] - H_Mass
  25, // CarHCP[19] - H_TRes
  10, // CarHCP[20] - H_Mass
  25, // CarHCP[20] - H_TRes
  10, // CarHCP[21] - H_Mass
  25, // CarHCP[21] - H_TRes
  10, // CarHCP[22] - H_Mass
  25, // CarHCP[22] - H_TRes
  10, // CarHCP[23] - H_Mass
  25, // CarHCP[23] - H_TRes
  10, // CarHCP[24] - H_Mass
  25, // CarHCP[24] - H_TRes
  10, // CarHCP[25] - H_Mass
  25, // CarHCP[25] - H_TRes
  10, // CarHCP[26] - H_Mass
  25, // CarHCP[26] - H_TRes
  10, // CarHCP[27] - H_Mass
  25, // CarHCP[27] - H_TRes
  10, // CarHCP[28] - H_Mass
  25, // CarHCP[28] - H_TRes
  10, // CarHCP[29] - H_Mass
  25, // CarHCP[29] - H_TRes
  10, // CarHCP[30] - H_Mass
  25, // CarHCP[30] - H_TRes
  11, // CarHCP[31] - H_Mass
  26, // CarHCP[31] - H_TRes
]);

describe('IS_HCP', () => {
  testInstructionPacket({
    packetClass: IS_HCP,
    type: PacketType.ISP_HCP,
    size,
    data,
    buffer,
  });

  it('should a range error if Info does not have 32 items', () => {
    expect(() => {
      new IS_HCP({
        Info: [new CarHCP(), new CarHCP(), new CarHCP()],
      }).pack();
    }).toThrow(RangeError);
  });
});
