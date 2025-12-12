import { InSim } from 'node-insim';
import type { InSimPacketInstance } from 'node-insim/packets';
import { IS_ISI_ReqI, PacketType } from 'node-insim/packets';

// Host 1

const inSimHost1 = new InSim('Local Host');

inSimHost1.connect({
  IName: 'Node InSim App',
  Host: '127.0.0.1',
  Port: 29999,
  ReqI: IS_ISI_ReqI.SEND_VERSION,
  Admin: '',
});

inSimHost1.on('connect', onConnect);
inSimHost1.on('disconnect', onDisconnect);
inSimHost1.on(PacketType.ISP_VER, onVersion);
inSimHost1.on(PacketType.ISP_MSO, onMessage);

// Host 2

const inSimHost2 = new InSim('Host Two');

inSimHost2.connect({
  IName: 'Node InSim App',
  Host: '127.0.0.2',
  Port: 29998,
  ReqI: IS_ISI_ReqI.SEND_VERSION,
  Admin: '',
});

inSimHost2.on('connect', onConnect);
inSimHost2.on('disconnect', onDisconnect);

inSimHost2.on(PacketType.ISP_VER, onVersion);
inSimHost2.on(PacketType.ISP_MSO, onMessage);

// Event handlers

function onConnect(inSim: InSim) {
  console.log(
    `Connected to ${inSim.options.Host}:${inSim.options.Port} (${inSim.id})`,
  );
}

function onDisconnect(inSim: InSim) {
  console.log(
    `Disconnected from ${inSim.options.Host}:${inSim.options.Port} (${inSim.id})`,
  );
}

function onVersion(
  packet: InSimPacketInstance<PacketType.ISP_VER>,
  inSim: InSim,
) {
  console.log(
    `Connected to LFS ${packet.Product} ${packet.Version} at ${inSim.options.Host}:${inSim.options.Port} (${inSim.id})`,
  );
}

function onMessage(
  packet: InSimPacketInstance<PacketType.ISP_MSO>,
  inSim: InSim,
) {
  console.log(
    `${inSim.options.Host}:${inSim.options.Port} (${inSim.id}) - message received: ${packet.Msg}`,
  );
}

process.on('uncaughtException', (error) => {
  console.log(error);
});
