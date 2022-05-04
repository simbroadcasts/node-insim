import NodeInSim, { PacketType } from '../../src';
import {
  InSimFlags,
  IS_ISI_ReqI,
  IS_SMALL,
  IS_TINY,
  IS_VER,
  SmallType,
  TinyType,
} from '../../src/packets';
import { InSim } from '../../src/protocols';
import { createLog } from '../../src/utils';

const inSim = new NodeInSim.InSim();
const insimName = 'Node InSim Full';
const log = createLog(insimName);

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

inSim.on('connect', () => log.info('Connected'));
inSim.on('disconnect', () => log.info('Disconnected'));
inSim.on(PacketType.ISP_VER, onVersion);
inSim.on(PacketType.ISP_TINY, onTiny);
inSim.on(PacketType.ISP_SMALL, onSmall);

function onVersion(packet: IS_VER, inSim: InSim) {
  log.info(
    `Connected to LFS ${packet.Product} ${packet.Version}`,
    inSim.options,
  );
}

function onTiny(packet: IS_TINY) {
  log.info('Received IS_TINY packet', TinyType[packet.SubT]);
}

function onSmall(packet: IS_SMALL) {
  log.info(
    `Received IS_SMALL packet ${SmallType[packet.SubT]}: ${packet.UVal}`,
  );
}

inSim.on('error', (error) => {
  log.error(`${insimName}: Error:`, error);
});
