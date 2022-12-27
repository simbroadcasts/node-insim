import { InSim } from '../../protocols';
import { stringToBytes, testInstructionPacket } from '../../utils';
import type { IS_ISI_Data } from '..';
import { IS_ISI, PacketType } from '..';
import { AbstractPacket } from '../AbstractPacket';

const size = 44;

const data: IS_ISI_Data = {
  ReqI: 1,
  UDPPort: 257,
  Flags: 2,
  InSimVer: InSim.INSIM_VERSION,
  Prefix: '!',
  Interval: 30,
  Admin: 'admin adminadmin',
  IName: 'app app app app',
};

const buffer = Buffer.from([
  size / AbstractPacket.SIZE_MULTIPLIER, // Size
  1, // Type
  1, // ReqI
  0, // Zero
  1, // UDPPort (1)
  1, // UDPPort (2)
  2, // Flags (1)
  0, // flags (2)
  9, // InSimVer
  '!'.charCodeAt(0), // Prefix
  30, // Interval (1)
  0, // Interval (2)
  ...stringToBytes('admin adminadmin'), // Admin[16]
  ...stringToBytes('app app app app'), // IName[16]
  0,
]);

describe('IS_ISI', () => {
  testInstructionPacket({
    packetClass: IS_ISI,
    size: size,
    type: PacketType.ISP_ISI,
    data,
    buffer,
  });

  it('should throw a range error if IName length is greater than 15', () => {
    expect(() => {
      new IS_ISI({ IName: 'app app app app1' }).pack();
    }).toThrow(RangeError);
  });
});
