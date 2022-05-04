import NodeInSim from '../../../src';
import type { IS_BTC, IS_SMALL, IS_VER } from '../../../src/packets';
import {
  InSimFlags,
  IS_ISI_ReqI,
  IS_TINY,
  PacketType,
  SENDABLE_TINY_TYPES,
  SmallType,
  TinyType,
} from '../../../src/packets';
import type { InSim } from '../../../src/protocols';
import { createLog } from '../../../src/utils';
import { drawButtonList } from './gui';

const insimName = 'Node InSim Full';
const log = createLog(insimName);
const inSim = new NodeInSim.InSim();

const TINY_BUTTON_CLICK_ID_OFFSET = 70;

export function startInSim(host = '127.0.0.1', port = 29999) {
  inSim.connect({
    Host: host,
    Port: port,
    ReqI: IS_ISI_ReqI.SEND_VERSION,
    IName: insimName,
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
  inSim.on('error', (error) => {
    log.error(`${insimName}: Error:`, error);
  });
  inSim.on(PacketType.ISP_VER, onVersion);
  inSim.on(PacketType.ISP_TINY, onTiny);
  inSim.on(PacketType.ISP_SMALL, onSmall);
  inSim.on(PacketType.ISP_BTC, onButtonClick);
}

function onVersion(packet: IS_VER, inSim: InSim) {
  if (packet.ReqI === IS_ISI_ReqI.SEND_VERSION) {
    log.info(
      `Connected to LFS ${packet.Product} ${packet.Version}`,
      inSim.options,
    );

    initializeInterface();
  } else {
    log.info(`Received IS_VER packet - ${packet.Product} ${packet.Version}`);
  }
}

function onTiny(packet: IS_TINY) {
  log.info('Received IS_TINY packet', TinyType[packet.SubT]);
}

function onSmall(packet: IS_SMALL) {
  log.info(
    `Received IS_SMALL packet ${SmallType[packet.SubT]}: ${packet.UVal}`,
  );
}

function onButtonClick(packet: IS_BTC, inSim: InSim) {
  log.info(`Received IS_BTC packet - ClickID ${packet.ClickID}`);

  const tinyType = packet.ClickID - TINY_BUTTON_CLICK_ID_OFFSET;

  if (SENDABLE_TINY_TYPES.includes(tinyType)) {
    log.info(`Send IS_TINY - ${TinyType[tinyType]} (${tinyType})`);
    inSim.send(
      new IS_TINY({
        ReqI: 2,
        SubT: tinyType,
      }),
    );
  }
}

export function initializeInterface() {
  drawTinyPacketButtons(50, 10);
}

function drawTinyPacketButtons(leftOffset: number, topOffset: number) {
  drawButtonList(inSim, {
    title: 'IS_TINY',
    leftOffset,
    topOffset,
    buttons: SENDABLE_TINY_TYPES.map((tinyTypeNumber) => ({
      clickId: tinyTypeNumber + TINY_BUTTON_CLICK_ID_OFFSET,
      text: `${TinyType[tinyTypeNumber]} (${tinyTypeNumber})`,
    })),
  });
}
