import { InSim } from '../../protocols';
import { checkPacketDataSize } from '../../utils';
import type { IS_ISI_Data } from '..';
import { IS_ISI } from '..';
import { BasePacket } from '../BasePacket';
import { PacketType } from '../packetTypes';

describe('IS_ISI', () => {
  checkPacketDataSize(new IS_ISI());

  it('should fill data from the constructor', () => {
    const data: IS_ISI_Data = {
      ReqI: 1,
      UDPPort: 12345,
      Flags: 2,
      InSimVer: 9,
      Prefix: '!',
      Interval: 20,
      Admin: 'admin',
      IName: 'MyApp',
    };
    const packet = new IS_ISI(data);

    expect(packet.ReqI).toEqual(data.ReqI);
    expect(packet.UDPPort).toEqual(data.UDPPort);
    expect(packet.Flags).toEqual(data.Flags);
    expect(packet.InSimVer).toEqual(data.InSimVer);
    expect(packet.Prefix).toEqual(data.Prefix);
    expect(packet.Interval).toEqual(data.Interval);
    expect(packet.IName).toEqual(data.IName);
  });

  it('should pack data into a buffer', () => {
    const data: IS_ISI_Data = {
      ReqI: 1,
      UDPPort: 257,
      Flags: 2,
      InSimVer: InSim.INSIM_VERSION,
      Prefix: '!',
      Interval: 30,
      Admin: 'admin',
      IName: 'app',
    };
    const actualBuffer = new IS_ISI(data).pack();
    const expectedBuffer = Buffer.from([
      44 / BasePacket.SIZE_MULTIPLIER, // Size
      PacketType.ISP_ISI, // Type
      1, // ReqI
      0, // Zero
      1, // UDPPort (1)
      1, // UDPPort (2)
      2, // Flags (1)
      0, // flags (2)
      InSim.INSIM_VERSION, // InSimVer
      '!'.charCodeAt(0), // Prefix
      30, // Interval (1)
      0, // Interval (2)
      'a'.charCodeAt(0), // Admin[16]
      'd'.charCodeAt(0),
      'm'.charCodeAt(0),
      'i'.charCodeAt(0),
      'n'.charCodeAt(0),
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
      'a'.charCodeAt(0), // IName[16]
      'p'.charCodeAt(0),
      'p'.charCodeAt(0),
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
    ]);

    expect(actualBuffer).toEqual(expectedBuffer);
  });
});
