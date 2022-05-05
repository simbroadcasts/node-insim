import NodeInSim from '../../../src';
import type { IS_BTC, IS_BTT, IS_VER } from '../../../src/packets';
import {
  ButtonStyle,
  ButtonTextColour,
  InSimFlags,
  IS_ISI_ReqI,
  IS_SMALL,
  IS_TINY,
  PacketType,
  SENDABLE_SMALL_TYPES,
  SENDABLE_TINY_TYPES,
  SmallType,
  TinyType,
} from '../../../src/packets';
import type { InSim } from '../../../src/protocols';
import { createLog } from '../../../src/utils';
import type { ButtonListProps } from './buttons';
import { buttonTextWithCaption, drawButtonList } from './buttons';
import { getStringEnumValues } from './utils';

const insimName = 'Node InSim Full';
const log = createLog(insimName);
const inSim = new NodeInSim.InSim();

const TINY_BUTTON_CLICK_ID_OFFSET = 70;
const SMALL_BUTTON_CLICK_ID_OFFSET =
  TINY_BUTTON_CLICK_ID_OFFSET + Math.max(...SENDABLE_TINY_TYPES) + 1;

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
  inSim.on('error', (error) => log.error('Error:', error));
  inSim.on(PacketType.ISP_VER, onVersion);
  inSim.on(PacketType.ISP_TINY, onTiny);
  inSim.on(PacketType.ISP_SMALL, onSmall);
  inSim.on(PacketType.ISP_BTC, onButtonClick);
  inSim.on(PacketType.ISP_BTT, onButtonType);
}

function onVersion(packet: IS_VER, inSim: InSim) {
  if (packet.ReqI === IS_ISI_ReqI.SEND_VERSION) {
    log.info(
      `Connected to LFS ${packet.Product} ${packet.Version}`,
      inSim.options,
    );

    drawButtons();
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

  if (
    packet.ClickID >= TINY_BUTTON_CLICK_ID_OFFSET &&
    packet.ClickID <=
      TINY_BUTTON_CLICK_ID_OFFSET + Math.max(...SENDABLE_TINY_TYPES)
  ) {
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
}

function onButtonType(packet: IS_BTT, inSim: InSim) {
  log.info(`Received IS_BTT packet - ClickID ${packet.ClickID}`, {
    text: packet.Text,
  });

  if (
    packet.ClickID >= SMALL_BUTTON_CLICK_ID_OFFSET &&
    packet.ClickID <=
      SMALL_BUTTON_CLICK_ID_OFFSET + Math.max(...SENDABLE_SMALL_TYPES)
  ) {
    const smallType = packet.ClickID - SMALL_BUTTON_CLICK_ID_OFFSET;

    if (SENDABLE_SMALL_TYPES.includes(smallType)) {
      const uVal = parseInt(packet.Text, 10);

      if (isNaN(uVal)) {
        log.warn('UVal must be a number');
        return;
      }

      log.info(`Send IS_SMALL - ${SmallType[smallType]} (${smallType})`);
      inSim.send(
        new IS_SMALL({
          ReqI: 2,
          SubT: smallType,
          UVal: uVal,
        }),
      );
    }
  }
}

export function drawButtons() {
  drawButtonVariants();
  drawTinyPacketButtons();
  drawSmallPacketButtons();
}

function drawButtonVariants() {
  const buttons: ButtonListProps['buttons'] = [];

  getStringEnumValues(ButtonStyle).forEach((styleString) => {
    const styleNumber = ButtonStyle[styleString];
    buttons.push({
      Text: `${styleString} (${styleNumber})`,
      BStyle: styleNumber,
    });
  });

  getStringEnumValues(ButtonTextColour).forEach((styleString) => {
    const styleNumber = ButtonTextColour[styleString];

    buttons.push({
      Text: `${styleString} (${styleNumber})`,
      BStyle: styleNumber,
    });
  });

  drawButtonList(inSim, {
    title: 'Button styles',
    titleClickId: 0,
    leftOffset: 50,
    topOffset: 10,
    width: 20,
    height: 4,
    buttons,
  });
}

function drawTinyPacketButtons() {
  drawButtonList(inSim, {
    title: 'IS_TINY',
    titleClickId: TINY_BUTTON_CLICK_ID_OFFSET - 1,
    leftOffset: 70,
    topOffset: 10,
    width: 20,
    height: 4,
    buttons: SENDABLE_TINY_TYPES.map((tinyTypeNumber) => ({
      ClickID: tinyTypeNumber + TINY_BUTTON_CLICK_ID_OFFSET,
      Text: `${TinyType[tinyTypeNumber]} (${tinyTypeNumber})`,
      BStyle: ButtonStyle.ISB_DARK | ButtonStyle.ISB_CLICK,
    })),
  });
}

function drawSmallPacketButtons() {
  drawButtonList(inSim, {
    title: 'IS_SMALL',
    titleClickId: SMALL_BUTTON_CLICK_ID_OFFSET,
    leftOffset: 90,
    topOffset: 10,
    width: 20,
    height: 4,
    buttons: SENDABLE_SMALL_TYPES.map((smallTypeNumber) => {
      const text = `${SmallType[smallTypeNumber]} (${smallTypeNumber})`;

      return {
        ClickID: smallTypeNumber + SMALL_BUTTON_CLICK_ID_OFFSET,
        Text: buttonTextWithCaption(`${text} - UVal`, text),
        BStyle: ButtonStyle.ISB_DARK | ButtonStyle.ISB_CLICK,
        TypeIn: 95,
      };
    }),
  });
}
