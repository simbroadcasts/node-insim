import NodeInSim from '../../src';
import { IS_TINY, PacketType, TinyType } from '../../src/packets';
import { getInSimConnectionOptions } from '../helpers';

describe('InSim ping', () => {
  it('should connect to LFS and ping it', (done) => {
    const inSim = new NodeInSim.InSim();

    inSim.connect({
      ...getInSimConnectionOptions(),
      IName: 'Ping test',
    });

    inSim.on('connect', () => {
      inSim.send(
        new IS_TINY({
          ReqI: 1,
          SubT: TinyType.TINY_PING,
        }),
      );
    });

    inSim.on(PacketType.ISP_TINY, function onVersion(packet: IS_TINY) {
      expect(packet.SubT === TinyType.TINY_REPLY);
      expect(packet.ReqI === 1);
      inSim.disconnect();
      inSim.once('disconnect', () => {
        done();
      });
    });
  });
});
