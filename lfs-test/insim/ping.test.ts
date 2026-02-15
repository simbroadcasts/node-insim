import { InSim } from '../../src';
import { IS_TINY, PacketType, TinyType } from '../../src/packets';
import { getInSimConnectionOptions } from '../helpers';

describe('InSim ping', () => {
  it('should connect to LFS and ping it', () =>
    new Promise<void>((done) => {
      const inSim = new InSim();

      inSim.connect({
        ...getInSimConnectionOptions(),
        IName: 'Ping test',
      });

      inSim.on('connect', () => {
        setTimeout(() => {
          inSim.send(
            new IS_TINY({
              ReqI: 1,
              SubT: TinyType.TINY_PING,
            }),
          );
        }, 1000);
      });

      inSim.on(PacketType.ISP_TINY, (packet) => {
        expect(packet.SubT === TinyType.TINY_REPLY);
        expect(packet.ReqI === 1);
        inSim.disconnect();
        inSim.once('disconnect', () => {
          done();
        });
      });
    }));
});
