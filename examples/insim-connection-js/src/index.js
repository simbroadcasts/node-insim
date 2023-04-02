require('./env');

const debug = require('debug');
const { InSim } = require('node-insim');
const { IS_ISI_ReqI, PacketType } = require('node-insim/packets');

const log = debug('node-insim-js');

const inSim = new InSim();

inSim.connect({
  IName: 'Node InSim App',
  Host: process.env.HOST ?? '127.0.0.1',
  Port: process.env.PORT ? parseInt(process.env.PORT, 10) : 29999,
  ReqI: IS_ISI_ReqI.SEND_VERSION,
  Admin: process.env.ADMIN ?? '',
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
