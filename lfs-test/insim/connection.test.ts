import { InSim } from '../../src';
import { getInSimConnectionOptions } from '../helpers';

describe('InSim connection', () => {
  it('should connect to LFS', () =>
    new Promise<void>((done) => {
      const inSim = new InSim();

      inSim.connect({
        ...getInSimConnectionOptions(),
        IName: 'Connection test',
      });

      inSim.on('connect', () => {
        setTimeout(() => {
          inSim.disconnect();
          inSim.once('disconnect', () => {
            done();
          });
        }, 1000);
      });
    }));
});
