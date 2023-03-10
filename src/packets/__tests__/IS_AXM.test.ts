import { testInfoPacket, testInstructionPacket } from '../../utils/tests';
import type { IS_AXM_Data } from '..';
import { ObjectInfo } from '..';
import { IS_AXM, PacketType, PMOAction, PMOFlags } from '..';

const size = 488;

const data: IS_AXM_Data = {
  NumO: 60,
  UCID: 3,
  PMOAction: PMOAction.PMO_ADD_OBJECTS,
  PMOFlags: PMOFlags.PMO_SELECTION_REAL,
  Info: [
    new ObjectInfo({
      Flags: 0,
      Heading: 128,
      Index: 51,
      X: -9556,
      Y: -30695,
      Zbyte: 8,
    }),
    new ObjectInfo({
      Flags: 0,
      Heading: 128,
      Index: 169,
      X: -9702,
      Y: -30671,
      Zbyte: 8,
    }),
    new ObjectInfo({
      Flags: 0,
      Heading: 128,
      Index: 51,
      X: -9529,
      Y: -30580,
      Zbyte: 8,
    }),
    new ObjectInfo({
      Flags: 0,
      Heading: 128,
      Index: 168,
      X: -9720,
      Y: -30671,
      Zbyte: 8,
    }),
    new ObjectInfo({
      Flags: 0,
      Heading: 128,
      Index: 160,
      X: -9683,
      Y: -30658,
      Zbyte: 8,
    }),
    new ObjectInfo({
      Flags: 0,
      Heading: 128,
      Index: 51,
      X: -9618,
      Y: -30614,
      Zbyte: 8,
    }),
    new ObjectInfo({
      Flags: 0,
      Heading: 128,
      Index: 64,
      X: -9819,
      Y: -30661,
      Zbyte: 8,
    }),
    new ObjectInfo({
      Flags: 0,
      Heading: 128,
      Index: 66,
      X: -9847,
      Y: -30662,
      Zbyte: 8,
    }),
    new ObjectInfo({
      Flags: 0,
      Heading: 128,
      Index: 4,
      X: -9719,
      Y: -30625,
      Zbyte: 8,
    }),
    new ObjectInfo({
      Flags: 20,
      Heading: 139,
      Index: 175,
      X: -9791,
      Y: -30636,
      Zbyte: 8,
    }),
    new ObjectInfo({
      Flags: 2,
      Heading: 128,
      Index: 178,
      X: -9816,
      Y: -30636,
      Zbyte: 8,
    }),
    new ObjectInfo({
      Flags: 0,
      Heading: 128,
      Index: 51,
      X: -9543,
      Y: -30489,
      Zbyte: 8,
    }),
    new ObjectInfo({
      Flags: 128,
      Heading: 0,
      Index: 178,
      X: -9802,
      Y: -30619,
      Zbyte: 10,
    }),
    new ObjectInfo({
      Flags: 128,
      Heading: 128,
      Index: 178,
      X: -9802,
      Y: -30618,
      Zbyte: 10,
    }),
    new ObjectInfo({
      Flags: 3,
      Heading: 128,
      Index: 178,
      X: -9803,
      Y: -30618,
      Zbyte: 10,
    }),
    new ObjectInfo({
      Flags: 0,
      Heading: 128,
      Index: 149,
      X: -9842,
      Y: -30610,
      Zbyte: 8,
    }),
    new ObjectInfo({
      Flags: 128,
      Heading: 0,
      Index: 178,
      X: -9802,
      Y: -30626,
      Zbyte: 12,
    }),
    new ObjectInfo({
      Flags: 1,
      Heading: 128,
      Index: 178,
      X: -9813,
      Y: -30601,
      Zbyte: 8,
    }),
    new ObjectInfo({
      Flags: 128,
      Heading: 128,
      Index: 178,
      X: -9802,
      Y: -30611,
      Zbyte: 12,
    }),
    new ObjectInfo({
      Flags: 0,
      Heading: 128,
      Index: 43,
      X: -9855,
      Y: -30574,
      Zbyte: 8,
    }),
    new ObjectInfo({
      Flags: 0,
      Heading: 128,
      Index: 5,
      X: -9726,
      Y: -30530,
      Zbyte: 8,
    }),
    new ObjectInfo({
      Flags: 0,
      Heading: 128,
      Index: 51,
      X: -9638,
      Y: -30485,
      Zbyte: 8,
    }),
    new ObjectInfo({
      Flags: 0,
      Heading: 128,
      Index: 7,
      X: -9808,
      Y: -30543,
      Zbyte: 8,
    }),
    new ObjectInfo({
      Flags: 0,
      Heading: 128,
      Index: 51,
      X: -9601,
      Y: -30450,
      Zbyte: 8,
    }),
    new ObjectInfo({
      Flags: 0,
      Heading: 128,
      Index: 6,
      X: -9778,
      Y: -30518,
      Zbyte: 8,
    }),
    new ObjectInfo({
      Flags: 0,
      Heading: 128,
      Index: 8,
      X: -9805,
      Y: -30473,
      Zbyte: 8,
    }),
    new ObjectInfo({
      Flags: 0,
      Heading: 128,
      Index: 10,
      X: -9861,
      Y: -30481,
      Zbyte: 8,
    }),
    new ObjectInfo({
      Flags: 0,
      Heading: 128,
      Index: 9,
      X: -9834,
      Y: -30476,
      Zbyte: 8,
    }),
    new ObjectInfo({
      Flags: 0,
      Heading: 128,
      Index: 5,
      X: -9731,
      Y: -30398,
      Zbyte: 8,
    }),
    new ObjectInfo({
      Flags: 0,
      Heading: 128,
      Index: 5,
      X: -9791,
      Y: -30386,
      Zbyte: 8,
    }),
    new ObjectInfo({
      Flags: 0,
      Heading: 128,
      Index: 5,
      X: -9892,
      Y: -30389,
      Zbyte: 8,
    }),
    new ObjectInfo({
      Flags: 0,
      Heading: 128,
      Index: 5,
      X: -9838,
      Y: -30376,
      Zbyte: 8,
    }),
    new ObjectInfo({
      Flags: 52,
      Heading: 128,
      Index: 174,
      X: -9546,
      Y: -29730,
      Zbyte: 8,
    }),
    new ObjectInfo({
      Flags: 0,
      Heading: 128,
      Index: 5,
      X: -9736,
      Y: -30258,
      Zbyte: 8,
    }),
    new ObjectInfo({
      Flags: 0,
      Heading: 128,
      Index: 5,
      X: -9753,
      Y: -29423,
      Zbyte: 8,
    }),
    new ObjectInfo({
      Flags: 0,
      Heading: 128,
      Index: 5,
      X: -9813,
      Y: -29411,
      Zbyte: 8,
    }),
    new ObjectInfo({
      Flags: 0,
      Heading: 128,
      Index: 5,
      X: -9796,
      Y: -30246,
      Zbyte: 8,
    }),
    new ObjectInfo({
      Flags: 0,
      Heading: 128,
      Index: 5,
      X: -9860,
      Y: -29401,
      Zbyte: 8,
    }),
    new ObjectInfo({
      Flags: 0,
      Heading: 128,
      Index: 5,
      X: -9843,
      Y: -30236,
      Zbyte: 8,
    }),
    new ObjectInfo({
      Flags: 0,
      Heading: 128,
      Index: 5,
      X: -9897,
      Y: -30249,
      Zbyte: 8,
    }),
    new ObjectInfo({
      Flags: 0,
      Heading: 128,
      Index: 5,
      X: -9748,
      Y: -29563,
      Zbyte: 8,
    }),
    new ObjectInfo({
      Flags: 0,
      Heading: 128,
      Index: 5,
      X: -9742,
      Y: -30112,
      Zbyte: 8,
    }),
    new ObjectInfo({
      Flags: 0,
      Heading: 128,
      Index: 5,
      X: -9808,
      Y: -29551,
      Zbyte: 8,
    }),
    new ObjectInfo({
      Flags: 0,
      Heading: 128,
      Index: 5,
      X: -9855,
      Y: -29541,
      Zbyte: 8,
    }),
    new ObjectInfo({
      Flags: 0,
      Heading: 128,
      Index: 5,
      X: -9743,
      Y: -29695,
      Zbyte: 8,
    }),
    new ObjectInfo({
      Flags: 0,
      Heading: 128,
      Index: 5,
      X: -9802,
      Y: -30100,
      Zbyte: 8,
    }),
    new ObjectInfo({
      Flags: 0,
      Heading: 128,
      Index: 5,
      X: -9747,
      Y: -29980,
      Zbyte: 8,
    }),
    new ObjectInfo({
      Flags: 0,
      Heading: 128,
      Index: 5,
      X: -9909,
      Y: -29554,
      Zbyte: 8,
    }),
    new ObjectInfo({
      Flags: 0,
      Heading: 128,
      Index: 5,
      X: -9849,
      Y: -30090,
      Zbyte: 8,
    }),
    new ObjectInfo({
      Flags: 0,
      Heading: 128,
      Index: 5,
      X: -9752,
      Y: -29840,
      Zbyte: 8,
    }),
    new ObjectInfo({
      Flags: 0,
      Heading: 128,
      Index: 5,
      X: -9803,
      Y: -29683,
      Zbyte: 8,
    }),
    new ObjectInfo({
      Flags: 0,
      Heading: 128,
      Index: 5,
      X: -9903,
      Y: -30103,
      Zbyte: 8,
    }),
    new ObjectInfo({
      Flags: 0,
      Heading: 128,
      Index: 5,
      X: -9850,
      Y: -29673,
      Zbyte: 8,
    }),
    new ObjectInfo({
      Flags: 0,
      Heading: 128,
      Index: 5,
      X: -9807,
      Y: -29968,
      Zbyte: 8,
    }),
    new ObjectInfo({
      Flags: 0,
      Heading: 128,
      Index: 5,
      X: -9812,
      Y: -29828,
      Zbyte: 8,
    }),
    new ObjectInfo({
      Flags: 0,
      Heading: 128,
      Index: 5,
      X: -9854,
      Y: -29958,
      Zbyte: 8,
    }),
    new ObjectInfo({
      Flags: 0,
      Heading: 128,
      Index: 5,
      X: -9904,
      Y: -29686,
      Zbyte: 8,
    }),
    new ObjectInfo({
      Flags: 0,
      Heading: 128,
      Index: 5,
      X: -9859,
      Y: -29818,
      Zbyte: 8,
    }),
    new ObjectInfo({
      Flags: 0,
      Heading: 128,
      Index: 5,
      X: -9908,
      Y: -29971,
      Zbyte: 8,
    }),
    new ObjectInfo({
      Flags: 0,
      Heading: 128,
      Index: 5,
      X: -9913,
      Y: -29831,
      Zbyte: 8,
    }),
  ],
};

const buffer = new Uint8Array([
  size / new IS_AXM().SIZE_MULTIPLIER, // Size
  54, // Type
  0, // ReqI
  60, // NumO
  3, // UCID
  1, // PMOAction
  4, // PMOFlags
  0, // Sp3
  172, // Info[1] - X (1)
  218, // Info[1] - X (2)
  25, // Info[1] - Y (1)
  136, // Info[1] - Y (2)
  8, // Info[1] - Zbyte
  0, // Info[1] - Flags
  51, // Info[1] - ObjectIndex
  128, // Info[1] - Heading
  26, // Info[2] ...
  218,
  49,
  136,
  8,
  0,
  169,
  128,
  199,
  218,
  140,
  136,
  8,
  0,
  51,
  128,
  8,
  218,
  49,
  136,
  8,
  0,
  168,
  128,
  45,
  218,
  62,
  136,
  8,
  0,
  160,
  128,
  110,
  218,
  106,
  136,
  8,
  0,
  51,
  128,
  165,
  217,
  59,
  136,
  8,
  0,
  64,
  128,
  137,
  217,
  58,
  136,
  8,
  0,
  66,
  128,
  9,
  218,
  95,
  136,
  8,
  0,
  4,
  128,
  193,
  217,
  84,
  136,
  8,
  20,
  175,
  139,
  168,
  217,
  84,
  136,
  8,
  2,
  178,
  128,
  185,
  218,
  231,
  136,
  8,
  0,
  51,
  128,
  182,
  217,
  101,
  136,
  10,
  128,
  178,
  0,
  182,
  217,
  102,
  136,
  10,
  128,
  178,
  128,
  181,
  217,
  102,
  136,
  10,
  3,
  178,
  128,
  142,
  217,
  110,
  136,
  8,
  0,
  149,
  128,
  182,
  217,
  94,
  136,
  12,
  128,
  178,
  0,
  171,
  217,
  119,
  136,
  8,
  1,
  178,
  128,
  182,
  217,
  109,
  136,
  12,
  128,
  178,
  128,
  129,
  217,
  146,
  136,
  8,
  0,
  43,
  128,
  2,
  218,
  190,
  136,
  8,
  0,
  5,
  128,
  90,
  218,
  235,
  136,
  8,
  0,
  51,
  128,
  176,
  217,
  177,
  136,
  8,
  0,
  7,
  128,
  127,
  218,
  14,
  137,
  8,
  0,
  51,
  128,
  206,
  217,
  202,
  136,
  8,
  0,
  6,
  128,
  179,
  217,
  247,
  136,
  8,
  0,
  8,
  128,
  123,
  217,
  239,
  136,
  8,
  0,
  10,
  128,
  150,
  217,
  244,
  136,
  8,
  0,
  9,
  128,
  253,
  217,
  66,
  137,
  8,
  0,
  5,
  128,
  193,
  217,
  78,
  137,
  8,
  0,
  5,
  128,
  92,
  217,
  75,
  137,
  8,
  0,
  5,
  128,
  146,
  217,
  88,
  137,
  8,
  0,
  5,
  128,
  182,
  218,
  222,
  139,
  8,
  52,
  174,
  128,
  248,
  217,
  206,
  137,
  8,
  0,
  5,
  128,
  231,
  217,
  17,
  141,
  8,
  0,
  5,
  128,
  171,
  217,
  29,
  141,
  8,
  0,
  5,
  128,
  188,
  217,
  218,
  137,
  8,
  0,
  5,
  128,
  124,
  217,
  39,
  141,
  8,
  0,
  5,
  128,
  141,
  217,
  228,
  137,
  8,
  0,
  5,
  128,
  87,
  217,
  215,
  137,
  8,
  0,
  5,
  128,
  236,
  217,
  133,
  140,
  8,
  0,
  5,
  128,
  242,
  217,
  96,
  138,
  8,
  0,
  5,
  128,
  176,
  217,
  145,
  140,
  8,
  0,
  5,
  128,
  129,
  217,
  155,
  140,
  8,
  0,
  5,
  128,
  241,
  217,
  1,
  140,
  8,
  0,
  5,
  128,
  182,
  217,
  108,
  138,
  8,
  0,
  5,
  128,
  237,
  217,
  228,
  138,
  8,
  0,
  5,
  128,
  75,
  217,
  142,
  140,
  8,
  0,
  5,
  128,
  135,
  217,
  118,
  138,
  8,
  0,
  5,
  128,
  232,
  217,
  112,
  139,
  8,
  0,
  5,
  128,
  181,
  217,
  13,
  140,
  8,
  0,
  5,
  128,
  81,
  217,
  105,
  138,
  8,
  0,
  5,
  128,
  134,
  217,
  23,
  140,
  8,
  0,
  5,
  128,
  177,
  217,
  240,
  138,
  8,
  0,
  5,
  128,
  172,
  217,
  124,
  139,
  8,
  0,
  5,
  128,
  130,
  217,
  250,
  138,
  8,
  0,
  5,
  128,
  80,
  217,
  10,
  140,
  8,
  0,
  5,
  128,
  125,
  217,
  134,
  139,
  8,
  0,
  5,
  128,
  76,
  217,
  237,
  138,
  8,
  0,
  5,
  128,
  71,
  217,
  121,
  139,
  8,
  0,
  5,
  128,
]);

describe('IS_AXM', () => {
  describe('60 objects', () => {
    testInstructionPacket({
      packetClass: IS_AXM,
      size: 8, // This is the default size in IS_AXM excluding the dynamic size
      type: PacketType.ISP_AXM,
      data,
      buffer,
    });
    testInfoPacket({
      packetClass: IS_AXM,
      size,
      type: PacketType.ISP_AXM,
      data,
      buffer,
    });
  });

  describe('1 object', () => {
    const size = 16;

    const data: IS_AXM_Data = {
      NumO: 1,
      UCID: 3,
      PMOAction: PMOAction.PMO_ADD_OBJECTS,
      PMOFlags: PMOFlags.PMO_SELECTION_REAL,
      Info: [
        new ObjectInfo({
          Flags: 0,
          Heading: 128,
          Index: 51,
          X: -9556,
          Y: -30695,
          Zbyte: 8,
        }),
      ],
    };

    const buffer = new Uint8Array([
      size / new IS_AXM().SIZE_MULTIPLIER, // Size
      54, // Type
      0, // ReqI
      1, // NumO
      3, // UCID
      1, // PMOAction
      4, // PMOFlags
      0, // Sp3
      172, // Info[1] - X (1)
      218, // Info[1] - X (2)
      25, // Info[1] - Y (1)
      136, // Info[1] - Y (2)
      8, // Info[1] - Zbyte
      0, // Info[1] - Flags
      51, // Info[1] - ObjectIndex
      128, // Info[1] - Heading
    ]);

    testInstructionPacket({
      packetClass: IS_AXM,
      size: 8, // This is the default size in IS_AXM excluding the dynamic size
      type: PacketType.ISP_AXM,
      data,
      buffer,
    });
    testInfoPacket({
      packetClass: IS_AXM,
      size,
      type: PacketType.ISP_AXM,
      data,
      buffer,
    });
  });

  it('should throw a range error if Info length is greater than 60', () => {
    expect(() => {
      new IS_AXM({
        NumO: 61,
        Info: [
          ...(data.Info ?? []),
          new ObjectInfo({
            Flags: 0,
            Heading: 127,
            Index: 50,
            X: -9556,
            Y: -30694,
            Zbyte: 8,
          }),
        ],
      }).pack();
    }).toThrow(RangeError);
  });
});
