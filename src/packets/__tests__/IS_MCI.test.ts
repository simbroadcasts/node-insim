import type { PacketTestData } from '../../utils/tests';
import { testInfoPacket } from '../../utils/tests';
import { CompCarFlags, IS_MCI, PacketType } from '..';
import { Packet } from '../base';
import { CompCar } from '../CompCar';

const size = 4 + 2 * 28;

const data: PacketTestData<IS_MCI> = {
  ReqI: 0,
  NumC: 2,
  Info: [
    new CompCar({
      Node: 57,
      Lap: 1,
      PLID: 17,
      Position: 1,
      Info: CompCarFlags.CCI_FIRST,
      X: 16543851,
      Y: 4709518,
      Z: 253714,
      Speed: 3731,
      Direction: 57086,
      Heading: 57104,
      AngVel: -64,
    }),
    new CompCar({
      Node: 60,
      Lap: 1,
      PLID: 18,
      Position: 2,
      Info: CompCarFlags.CCI_LAST,
      X: 17707201,
      Y: 5332717,
      Z: 230355,
      Speed: 4576,
      Direction: 56356,
      Heading: 56314,
      AngVel: 71,
    }),
  ],
};

const buffer = Buffer.from([
  size / Packet.SIZE_MULTIPLIER, // Size
  38, // Type
  0, // ReqI
  2, // NumC
  57, // Info[0] - Node (1)
  0, // Info[0] - Node (2)
  1, // Info[0] - Lap (1)
  0, // Info[0] - Lap (1)
  17, // Info[0] - PLID
  1, // Info[0] - Position
  64, // Info[0] - Info
  0, // Info[0] - Sp3
  107, // Info[0] - X (1)
  112, // Info[0] - X (2)
  252, // Info[0] - X (3)
  0, // Info[0] - X (4)
  142, // Info[0] - Y (1)
  220, // Info[0] - Y (2)
  71, // Info[0] - Y (3)
  0, // Info[0] - Y (4)
  18, // Info[0] - Z (1)
  223, // Info[0] - Z (2)
  3, // Info[0] - Z (3)
  0, // Info[0] - Z (4)
  147, // Info[0] - Speed (1)
  14, // Info[0] - Speed (2)
  254, // Info[0] - Direction (1)
  222, // Info[0] - Direction (2)
  16, // Info[0] - Heading (1)
  223, // Info[0] - Heading (2)
  192, // Info[0] - AngVel (1)
  255, // Info[0] - AngVel (2)
  60, // Info[1] - Node (1)
  0, // Info[1] - Node (2)
  1, // Info[1] - Lap (1)
  0, // Info[1] - Lap (1)
  18, // Info[1] - PLID
  2, // Info[1] - Position
  128, // Info[1] - Info
  0, // Info[1] - Sp3
  193, // Info[1] - X (1)
  48, // Info[1] - X (2)
  14, // Info[1] - X (3)
  1, // Info[1] - X (4)
  237, // Info[1] - Y (1)
  94, // Info[1] - Y (2)
  81, // Info[1] - Y (3)
  0, // Info[1] - Y (4)
  211, // Info[1] - Z (1)
  131, // Info[1] - Z (2)
  3, // Info[1] - Z (3)
  0, // Info[1] - Z (4)
  224, // Info[1] - Speed (1)
  17, // Info[1] - Speed (2)
  36, // Info[1] - Direction (1)
  220, // Info[1] - Direction (2)
  250, // Info[1] - Heading (1)
  219, // Info[1] - Heading (2)
  71, // Info[1] - AngVel (1)
  0, // Info[1] - AngVel (2)
]);

describe('IS_MCI', () => {
  testInfoPacket({
    packetClass: IS_MCI,
    size,
    type: PacketType.ISP_MCI,
    data,
    buffer,
  });
});
