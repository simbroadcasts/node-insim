import NodeInSim from '../../src';
import type { IS_VER } from '../../src/packets';
import { IS_ISI_ReqI, PacketType } from '../../src/packets';
import { getInSimConnectionOptions } from '../helpers';

describe('InSim version', () => {
  it('should connect to LFS and receive the version', (done) => {
    const inSim = new NodeInSim.InSim();

    inSim.connect({
      ...getInSimConnectionOptions(),
      IName: 'Version test',
      ReqI: IS_ISI_ReqI.SEND_VERSION,
    });

    inSim.on(PacketType.ISP_VER, function onVersion(packet: IS_VER) {
      expect(packet.ReqI === 1);
      inSim.disconnect();
      inSim.once('disconnect', () => {
        done();
      });
    });
  });
});
