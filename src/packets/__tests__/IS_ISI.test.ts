import { stringToBytes, testInstructionPacket } from '../../tests';
import type { IS_ISI_Data } from '..';
import { IS_ISI, PacketType } from '..';

const size = 44;

const data: IS_ISI_Data = {
  ReqI: 1,
  UDPPort: 257,
  Flags: 2,
  InSimVer: 9,
  Prefix: '!',
  Interval: 30,
  Admin: 'admin adminadmin',
  IName: 'app app app app1',
};

const buffer = new Uint8Array([
  size / new IS_ISI().SIZE_MULTIPLIER, // Size
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
  ...stringToBytes('app app app app1'), // IName[16]
]);

describe('IS_ISI', () => {
  testInstructionPacket({
    packetClass: IS_ISI,
    size,
    type: PacketType.ISP_ISI,
    data,
    buffer,
  });

  it('should truncate IName if it is longer than 16 characters', () => {
    expect(new IS_ISI({ IName: 'app app app app12' }).pack()).toEqual(
      new Uint8Array([
        size / new IS_ISI().SIZE_MULTIPLIER, // Size
        1, // Type
        0, // ReqI
        0, // Zero
        0, // UDPPort (1)
        0, // UDPPort (2)
        0, // Flags (1)
        0, // flags (2)
        0, // InSimVer
        0, // Prefix
        0, // Interval (1)
        0, // Interval (2)
        0, // Admin[16]
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        ...stringToBytes('app app app app1'), // IName[16]
      ]),
    );
  });

  it('should truncate Admin if it is longer than 16 characters', () => {
    expect(new IS_ISI({ Admin: 'admin admin admin' }).pack()).toEqual(
      new Uint8Array([
        size / new IS_ISI().SIZE_MULTIPLIER, // Size
        1, // Type
        0, // ReqI
        0, // Zero
        0, // UDPPort (1)
        0, // UDPPort (2)
        0, // Flags (1)
        0, // flags (2)
        0, // InSimVer
        0, // Prefix
        0, // Interval (1)
        0, // Interval (2)
        ...stringToBytes('admin admin admi'), // Admin[16]
        0, // IName[16]
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
      ]),
    );
  });
});
