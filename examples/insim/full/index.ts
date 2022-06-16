import NodeInSim from '../../../src';
import { InSimFlags, IS_ISI_ReqI } from '../../../src/packets';
import { APP_NAME } from './constants';
import { drawTestButtons } from './features/buttons';
import { logPackets } from './features/packetLogs';
import { log } from './log';

const inSim = new NodeInSim.InSim();

function startInSim(host = '127.0.0.1', port = 29999) {
  inSim.connect({
    Host: host,
    Port: port,
    ReqI: IS_ISI_ReqI.SEND_VERSION,
    IName: APP_NAME,
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
  });

  inSim.on('connect', () => log.info('Connected'));
  inSim.on('disconnect', () => log.info('Disconnected'));
  inSim.on('error', (error) => log.error('Error:', error.name, error.message));

  logPackets(inSim);
  drawTestButtons(inSim);
}

startInSim('127.0.0.1', 29999);
