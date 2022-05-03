import NodeInSim, { PacketType } from '../../src';
import { InSimFlags, IS_ISI_ReqI, IS_VER } from '../../src/packets';

const inSim = new NodeInSim.InSim();

const insimName = 'Node InSim Full';

inSim.connect({
  Host: '127.0.0.1',
  Port: 29999,
  ReqI: IS_ISI_ReqI.SEND_VERSION,
  Flags:
    InSimFlags.ISF_LOCAL |
    InSimFlags.ISF_MSO_COLS |
    InSimFlags.ISF_NLP |
    InSimFlags.ISF_MCI |
    InSimFlags.ISF_CON |
    InSimFlags.ISF_OBH |
    InSimFlags.ISF_HLV |
    InSimFlags.ISF_AXM_LOAD |
    InSimFlags.ISF_AXM_EDIT |
    InSimFlags.ISF_REQ_JOIN,
  IName: insimName,
});

inSim.on('connect', () => console.log(`${insimName}: connected`));
inSim.on('disconnect', () => console.log(`${insimName}: disconnected`));
inSim.on(PacketType.ISP_VER, onVersion);

function onVersion(packet: IS_VER) {
  log(`${insimName}: LFS version ${packet.Product} ${packet.Version}`);
}

inSim.on('error', (error) => {
  logError(`${insimName}: Error:`, error);
});

function log(...args: unknown[]) {
  console.log(`${insimName}: `, ...args);
}

function logError(...args: unknown[]) {
  console.error(`${insimName}: `, ...args);
}
