import { PacketType } from '../enums/index.js';
import { NodeLap } from '../structs/index.js';
import type { PacketTestData } from '../tests';
import { testInfoPacket } from '../tests';
import { IS_NLP } from './IS_NLP.js';

const size = 40;

const data: PacketTestData<IS_NLP> = {
  ReqI: 1,
  NumP: 2,
  Info: [
    new NodeLap({
      Node: 282,
      Lap: 14,
      PLID: 5,
      Position: 18,
    }),
    new NodeLap({
      Node: 1315,
      Lap: 13,
      PLID: 6,
      Position: 19,
    }),
  ],
};

const buffer = new Uint8Array([
  size / new IS_NLP().SIZE_MULTIPLIER, // Size
  37, // Type
  1, // ReqI
  2, // NumP
  26, // Info[1] - Node (1)
  1, // Info[1] - Node (2)
  14, // Info[1] - Lap (1)
  0, // Info[1] - Lap (2)
  5, // Info[1] - PLID
  18, // Info[1] - Position
  35, // Info[2] - Node (1)
  5, // Info[2] - Node (2)
  13, // Info[2] - Lap (1)
  0, // Info[2] - Lap (2)
  6, // Info[2] - PLID
  19, // Info[2] - Position
]);

describe('IS_NLP', () => {
  testInfoPacket({
    packetClass: IS_NLP,
    size,
    type: PacketType.ISP_NLP,
    data,
    buffer,
  });
});
