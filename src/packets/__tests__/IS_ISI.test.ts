import { checkPacketDataSize } from '../../utils/testutils';
import { IS_ISI } from '../IS_ISI';

describe('IS_ISI', () => {
  checkPacketDataSize(new IS_ISI());

  it('should use data from constructor', () => {
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
});
