import NodeInSim from '../../src';
import { getInSimConnectionOptions } from '../helpers';

describe('InSim connection', () => {
  it('should connect to LFS', (done) => {
    const inSim = new NodeInSim.InSim();

    inSim.connect({
      ...getInSimConnectionOptions(),
      IName: 'Connection test',
    });

    inSim.on('connect', () => {
      inSim.disconnect();
      done();
    });
  });
});
