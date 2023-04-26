require('./env');

const debug = require('debug');
const { InSim } = require('node-insim');
const { IS_ISI_ReqI, PacketType } = require('node-insim/packets');

const log = debug('node-insim-multiple-hosts-js');

// Host 1

const inSimHost1 = new InSim('Local Host');

inSimHost1.connect({
  IName: 'Node InSim App',
  Host: process.env.SERVER_1_HOST ?? '127.0.0.1',
  Port: process.env.SERVER_1_PORT ? parseInt(process.env.SERVER_1_PORT) : 29999,
  ReqI: IS_ISI_ReqI.SEND_VERSION,
  Admin: process.env.SERVER_1_ADMIN ?? '',
});

inSimHost1.on('connect', onConnect);
inSimHost1.on('disconnect', onDisconnect);
inSimHost1.on(PacketType.ISP_VER, onVersion);
inSimHost1.on(PacketType.ISP_MSO, onMessage);

// Host 2

const inSimHost2 = new InSim('Host Two');

inSimHost2.connect({
  IName: 'Node InSim App',
  Host: process.env.SERVER_2_HOST ?? '127.0.0.2',
  Port: process.env.SERVER_2_PORT ? parseInt(process.env.SERVER_2_PORT) : 29998,
  ReqI: IS_ISI_ReqI.SEND_VERSION,
  Admin: process.env.SERVER_2_ADMIN ?? '',
});

inSimHost2.on('connect', onConnect);
inSimHost2.on('disconnect', onDisconnect);
inSimHost2.on(PacketType.ISP_VER, onVersion);
inSimHost2.on(PacketType.ISP_MSO, onMessage);

// Event handlers

function onConnect(inSim) {
  log(`Connected to ${inSim.options.Host}:${inSim.options.Port} (${inSim.id})`);
}

function onDisconnect(inSim) {
  log(
    `Disconnected from ${inSim.options.Host}:${inSim.options.Port} (${inSim.id})`,
  );
}

function onVersion(packet, inSim) {
  log(
    `Connected to LFS ${packet.Product} ${packet.Version} at ${inSim.options.Host}:${inSim.options.Port} (${inSim.id})`,
  );
}

function onMessage(packet, inSim) {
  log(
    `${inSim.options.Host}:${inSim.options.Port} (${inSim.id}) - message received: ${packet.Msg}`,
  );
}

process.on('uncaughtException', (error) => {
  log(error);
});
