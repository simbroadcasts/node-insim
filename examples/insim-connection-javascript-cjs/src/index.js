require('./env');

const debug = require('debug');
const NodeInSim = require('node-insim').default;
const { IS_ISI_ReqI, PacketType } = require('node-insim/packets');

const log = debug('node-insim-js');

const inSim = new NodeInSim.InSim();

inSim.connect({
  IName: 'Node InSim App',
  Host: '127.0.0.1',
  Port: 29999,
  ReqI: IS_ISI_ReqI.SEND_VERSION,
});

inSim.on('connect', () => log('Connected'));

inSim.on('disconnect', () => log('Disconnected'));

inSim.on(PacketType.ISP_VER, onVersion);

function onVersion(packet) {
  log(`Connected to LFS ${packet.Product} ${packet.Version}`);
}

process.on('uncaughtException', (error) => {
  log(error);
});
