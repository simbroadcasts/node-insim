import type { AllowedStateFlags, IS_BTC } from '../../../../../../src/packets';
import {
  ButtonStyle,
  ButtonTextColour,
  IS_CPP,
  IS_Y_MIN,
  TypeIn,
  ViewIdentifier,
} from '../../../../../../src/packets';
import type { InSim } from '../../../../../../src/protocols';
import { VIEW_IDENTIFIERS } from '../../../constants';
import { buttonTextWithCaption, drawButton, drawButtonList } from '../../../ui';
import type { ButtonData } from '../../../ui/button';
import { BUTTON_HEIGHT } from '../constants';

const INPUT_BUTTONS_LEFT_OFFSET = 124;
const INPUT_BUTTONS_WIDTH = 10;

export function drawCameraPositionPacketButtons(inSim: InSim) {
  let x = 0,
    y = 0,
    z = 0,
    heading = 0,
    pitch = 0,
    roll = 0,
    fov = 0,
    time = 0,
    viewPLID = 0;
  let inGameCam: ViewIdentifier = ViewIdentifier.VIEW_FOLLOW;
  const flags: AllowedStateFlags = 0;

  drawButton(inSim, {
    Text: 'IS_CPP',
    ReqI: 1,
    L: 97,
    T: IS_Y_MIN + BUTTON_HEIGHT * 4,
    W: 15,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_DARK | ButtonStyle.ISB_CLICK,
    onClick: (packet: IS_BTC, inSim: InSim) => {
      inSim.send(
        new IS_CPP({
          X: x,
          Y: y,
          Z: z,
          H: heading,
          P: pitch,
          R: roll,
          FOV: fov,
          Flags: flags,
          InGameCam: inGameCam,
          Time: time,
          ViewPLID: viewPLID,
        }),
      );
    },
  });

  drawButtonList(inSim, {
    width: 11,
    height: BUTTON_HEIGHT,
    leftOffset: 112,
    topOffset: IS_Y_MIN + BUTTON_HEIGHT * 4,
    buttons: [
      'X',
      'Y',
      'Z',
      'Heading',
      'Pitch',
      'Roll',
      'FOV',
      'Time',
      'ViewPLID',
      'InGameCam',
    ].map((label) => ({
      ReqI: 1,
      Text: `${label}:`,
      BStyle: ButtonStyle.ISB_C2 | ButtonStyle.ISB_LEFT,
    })),
  });

  drawButton(inSim, {
    ...inputButtonProps(4, 11),
    Text: buttonNumberTextWithCaption('X coordinate (1 m = 65536)', x),
    onType: (packet, _inSim, { update }) => {
      const parsedValue = parseInt(packet.Text, 10);
      !isNaN(parsedValue) && (x = parsedValue);

      update({
        ReqI: 1,
        Text: buttonNumberTextWithCaption('X coordinate (1 m = 65536)', x),
      });
    },
  });

  drawButton(inSim, {
    ...inputButtonProps(5, 11),
    Text: buttonNumberTextWithCaption('Y coordinate (1 m = 65536)', y),
    onType: (packet, _inSim, { update }) => {
      const parsedValue = parseInt(packet.Text, 10);
      !isNaN(parsedValue) && (y = parsedValue);

      update({
        ReqI: 1,
        Text: buttonNumberTextWithCaption('Y coordinate (1 m = 65536)', y),
      });
    },
  });

  drawButton(inSim, {
    ...inputButtonProps(6, 11),
    Text: buttonNumberTextWithCaption('Z coordinate (1 m = 65536)', z),
    onType: (packet, _inSim, { update }) => {
      const parsedValue = parseInt(packet.Text, 10);
      !isNaN(parsedValue) && (z = parsedValue);

      update({
        ReqI: 1,
        Text: buttonNumberTextWithCaption('Z coordinate (1 m = 65536)', z),
      });
    },
  });

  drawButton(inSim, {
    ...inputButtonProps(7, 5),
    Text: buttonNumberTextWithCaption('Heading', heading),
    onType: (packet, _inSim, { update }) => {
      const parsedValue = parseInt(packet.Text, 10);
      !isNaN(parsedValue) && (heading = parsedValue);

      update({
        ReqI: 1,
        Text: buttonNumberTextWithCaption('Heading', heading),
      });
    },
  });

  drawButton(inSim, {
    ...inputButtonProps(8, 5),
    Text: buttonNumberTextWithCaption('Pitch', pitch),
    onType: (packet, _inSim, { update }) => {
      const parsedValue = parseInt(packet.Text, 10);
      !isNaN(parsedValue) && (pitch = parsedValue);

      update({
        ReqI: 1,
        Text: buttonNumberTextWithCaption('Pitch', pitch),
      });
    },
  });

  drawButton(inSim, {
    ...inputButtonProps(9, 5),
    Text: buttonNumberTextWithCaption('Roll', roll),
    onType: (packet, _inSim, { update }) => {
      const parsedValue = parseInt(packet.Text, 10);
      !isNaN(parsedValue) && (roll = parsedValue);

      update({
        ReqI: 1,
        Text: buttonNumberTextWithCaption('Roll', roll),
      });
    },
  });

  drawButton(inSim, {
    ...inputButtonProps(10, 4),
    Text: buttonNumberTextWithCaption('FOV (degrees)', fov),
    onType: (packet, _inSim, { update }) => {
      const parsedValue = parseInt(packet.Text, 10);
      !isNaN(parsedValue) && (fov = parsedValue);

      update({
        ReqI: 1,
        Text: buttonNumberTextWithCaption('FOV (degrees)', fov),
      });
    },
  });

  drawButton(inSim, {
    ...inputButtonProps(11, 5),
    Text: buttonNumberTextWithCaption('Time (ms)', time),
    onType: (packet, _inSim, { update }) => {
      const parsedValue = parseInt(packet.Text, 10);
      !isNaN(parsedValue) && (time = parsedValue);

      update({
        ReqI: 1,
        Text: buttonNumberTextWithCaption('Time (ms)', time),
      });
    },
  });

  drawButton(inSim, {
    ...inputButtonProps(12, 3),
    Text: buttonNumberTextWithCaption('ViewPLID', viewPLID),
    onType: (packet, _inSim, { update }) => {
      const parsedValue = parseInt(packet.Text, 10);
      !isNaN(parsedValue) && (viewPLID = parsedValue);

      update({
        ReqI: 1,
        Text: buttonNumberTextWithCaption('ViewPLID', viewPLID),
      });
    },
  });

  drawButton(inSim, {
    ...buttonProps(13),
    Text: `[${VIEW_IDENTIFIERS[inGameCam]}]`,
    onClick: (_packet, _inSim, { update }) => {
      const viewIdentifierIds = Object.keys(VIEW_IDENTIFIERS);
      const identifierId = viewIdentifierIds.findIndex(
        (identifier) => identifier === inGameCam.toString(10),
      );

      const nextId =
        identifierId === viewIdentifierIds.length - 1
          ? viewIdentifierIds[0]
          : viewIdentifierIds[identifierId + 1];
      inGameCam = parseInt(nextId, 10);

      update({
        ReqI: 1,
        Text: `[${VIEW_IDENTIFIERS[inGameCam]}]`,
      });
    },
  });
}

function buttonNumberTextWithCaption(caption: string, number: number): string {
  return buttonTextWithCaption(caption, number.toString(10));
}

const buttonProps = (offset: number): ButtonData => ({
  ReqI: 1,
  L: INPUT_BUTTONS_LEFT_OFFSET,
  T: IS_Y_MIN + BUTTON_HEIGHT * offset,
  W: INPUT_BUTTONS_WIDTH,
  H: BUTTON_HEIGHT,
  BStyle: ButtonStyle.ISB_LIGHT | ButtonStyle.ISB_C2 | ButtonStyle.ISB_CLICK,
});

const inputButtonProps = (offset: number, typeIn: number): ButtonData => ({
  ...buttonProps(offset),
  TypeIn: typeIn + TypeIn.INIT_VALUE_BUTTON_TEXT,
  BStyle:
    ButtonStyle.ISB_LIGHT | ButtonTextColour.TextString | ButtonStyle.ISB_CLICK,
});
