import { INSIM_VERSION } from '../../protocols/InSim';
import { checkPacketDataSize } from '../../utils/testutils';
import { typedArraysAreEqual } from '../../utils/typedArrays';
import { IS_ISI } from '../IS_ISI';
import { PacketType } from '../packetTypes';

describe('IS_ISI', () => {
  checkPacketDataSize(new IS_ISI());

  it('should fill data from constructor', () => {
    const data = {
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
    const data = {
      ReqI: 1,
      UDPPort: 257,
      Flags: 2,
      InSimVer: INSIM_VERSION,
      Prefix: '!',
      Interval: 30,
      Admin: 'admin',
      IName: 'app',
    };
    const buffer = new IS_ISI(data).pack();

    expect(
      typedArraysAreEqual(
        buffer,
        new Uint8Array([
          11, // Size
          PacketType.ISP_ISI, // Type
          1, // ReqI
          0, // Zero
          1, // UDPPort (1)
          1, // UDPPort (2)
          2, // Flags (1)
          0, // flags (2)
          INSIM_VERSION, // InSimVer
          '!'.charCodeAt(0), // Prefix
          30, // Interval (1)
          0, // Interval (2)

          'a'.charCodeAt(0),
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

          'a'.charCodeAt(0),
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
        ]),
      ),
    ).toEqual(true);
  });
});
