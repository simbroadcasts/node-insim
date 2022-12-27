import type { PacketTestData } from '../../utils/tests';
import { testInfoPacket } from '../../utils/tests';
import { CarContact, CarContactFlags, IS_CON, PacketType } from '..';
import { AbstractPacket } from '../AbstractPacket';

const size = 40;

const data: PacketTestData<IS_CON> = {
  ReqI: 0,
  Zero: 0,
  SpClose: 155,
  Time: 1471,
  A: new CarContact({
    PLID: 1,
    Info: CarContactFlags.CCI_BLUE | CarContactFlags.CCI_LAG,
    Sp2: 0,
    Steer: 3,
    ThrBrk: 4,
    CluHan: 2,
    GearSp: 32,
    Speed: 26,
    Direction: 202,
    Heading: 196,
    AccelF: -1,
    AccelR: 11,
    X: 5109,
    Y: 1724,
  }),
  B: new CarContact({
    PLID: 2,
    Info: CarContactFlags.CCI_YELLOW | CarContactFlags.CCI_LAG,
    Sp2: 0,
    Steer: 5,
    ThrBrk: 112,
    CluHan: 9,
    GearSp: 32,
    Speed: 20,
    Direction: 172,
    Heading: 171,
    AccelF: 4,
    AccelR: 12,
    X: 5177,
    Y: 1736,
  }),
};

const buffer = Buffer.from([
  size / AbstractPacket.SIZE_MULTIPLIER, // Size
  50, // Type
  0, // ReqI
  0, // Zero
  155, // SpClose (1)
  0, // SpClose (2)
  191, // Time (1)
  5, // Time (2)
  1, // A - PLID
  33, // A - Info
  0, // A - Sp2
  3, // A - Steer
  4, // A - ThrBrk
  2, // A - CluHan
  32, // A - GearSp
  26, // A - Speed
  202, // A - Direction
  196, // A - Heading
  255, // A - AccelF
  11, // A - AccelR
  245, // A - X (1)
  19, // A - X (2)
  188, // A - Y (1)
  6, // A - Y (2)
  2, // B - PLID
  34, // B - Info
  0, // B - Sp2
  5, // B - Steer
  112, // B - ThrBrk
  9, // B - CluHan
  32, // B - GearSp
  20, // B - Speed
  172, // B - Direction
  171, // B - Heading
  4, // B - AccelF
  12, // B - AccelR
  57, // B - X (1)
  20, // B - X (2)
  200, // B - Y (1)
  6, // B - Y (2)
]);

describe('IS_CON', () => {
  testInfoPacket({
    packetClass: IS_CON,
    size,
    type: PacketType.ISP_CON,
    data,
    buffer,
  });
});
