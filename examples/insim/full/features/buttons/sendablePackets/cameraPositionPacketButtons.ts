import type { AllowedStateFlags } from '../../../../../../src/packets';
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
import { buttonTextWithCaption, drawButton } from '../../../ui';
import type { ButtonData } from '../../../ui/button';
import { BUTTON_HEIGHT } from '../constants';

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
    T: IS_Y_MIN + BUTTON_HEIGHT * 3,
    W: 15,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_DARK | ButtonStyle.ISB_CLICK,
    onClick: ({ inSim }) => {
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

  drawButton(inSim, {
    Text: 'X:',
    ReqI: 1,
    L: 112,
    T: IS_Y_MIN + BUTTON_HEIGHT * 3,
    W: 5,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_C2 | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    ...inputButtonProps(11),
    L: 115,
    T: IS_Y_MIN + BUTTON_HEIGHT * 3,
    W: 8,
    Text: buttonNumberTextWithCaption('X coordinate (1 m = 65536)', x),
    onType: ({ packet, button }) => {
      const parsedValue = parseInt(packet.Text, 10);
      !isNaN(parsedValue) && (x = parsedValue);

      button.update({
        ReqI: 1,
        Text: buttonNumberTextWithCaption('X coordinate (1 m = 65536)', x),
      });
    },
  });

  drawButton(inSim, {
    Text: 'Y:',
    ReqI: 1,
    L: 123,
    T: IS_Y_MIN + BUTTON_HEIGHT * 3,
    W: 5,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_C2 | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    ...inputButtonProps(11),
    L: 126,
    T: IS_Y_MIN + BUTTON_HEIGHT * 3,
    W: 8,
    Text: buttonNumberTextWithCaption('Y coordinate (1 m = 65536)', y),
    onType: ({ packet, button }) => {
      const parsedValue = parseInt(packet.Text, 10);
      !isNaN(parsedValue) && (y = parsedValue);

      button.update({
        ReqI: 1,
        Text: buttonNumberTextWithCaption('Y coordinate (1 m = 65536)', y),
      });
    },
  });

  drawButton(inSim, {
    Text: 'Z:',
    ReqI: 1,
    L: 134,
    T: IS_Y_MIN + BUTTON_HEIGHT * 3,
    W: 5,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_C2 | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    ...inputButtonProps(11),
    L: 137,
    T: IS_Y_MIN + BUTTON_HEIGHT * 3,
    W: 8,
    Text: buttonNumberTextWithCaption('Z coordinate (1 m = 65536)', z),
    onType: ({ packet, button }) => {
      const parsedValue = parseInt(packet.Text, 10);
      !isNaN(parsedValue) && (z = parsedValue);

      button.update({
        ReqI: 1,
        Text: buttonNumberTextWithCaption('Z coordinate (1 m = 65536)', z),
      });
    },
  });

  drawButton(inSim, {
    Text: 'Heading:',
    ReqI: 1,
    L: 145,
    T: IS_Y_MIN + BUTTON_HEIGHT * 3,
    W: 10,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_C2 | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    ...inputButtonProps(5),
    L: 153,
    T: IS_Y_MIN + BUTTON_HEIGHT * 3,
    W: 8,
    Text: buttonNumberTextWithCaption('Heading', heading),
    onType: ({ packet, button }) => {
      const parsedValue = parseInt(packet.Text, 10);
      !isNaN(parsedValue) && (heading = parsedValue);

      button.update({
        ReqI: 1,
        Text: buttonNumberTextWithCaption('Heading', heading),
      });
    },
  });

  drawButton(inSim, {
    Text: 'Pitch:',
    ReqI: 1,
    L: 161,
    T: IS_Y_MIN + BUTTON_HEIGHT * 3,
    W: 10,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_C2 | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    ...inputButtonProps(5),
    L: 167,
    T: IS_Y_MIN + BUTTON_HEIGHT * 3,
    W: 8,
    Text: buttonNumberTextWithCaption('Pitch', pitch),
    onType: ({ packet, button }) => {
      const parsedValue = parseInt(packet.Text, 10);
      !isNaN(parsedValue) && (pitch = parsedValue);

      button.update({
        ReqI: 1,
        Text: buttonNumberTextWithCaption('Pitch', pitch),
      });
    },
  });

  drawButton(inSim, {
    Text: 'Roll:',
    ReqI: 1,
    L: 175,
    T: IS_Y_MIN + BUTTON_HEIGHT * 3,
    W: 10,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_C2 | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    ...inputButtonProps(5),
    L: 180,
    T: IS_Y_MIN + BUTTON_HEIGHT * 3,
    W: 8,
    Text: buttonNumberTextWithCaption('Roll', roll),
    onType: ({ packet, button }) => {
      const parsedValue = parseInt(packet.Text, 10);
      !isNaN(parsedValue) && (roll = parsedValue);

      button.update({
        ReqI: 1,
        Text: buttonNumberTextWithCaption('Roll', roll),
      });
    },
  });

  drawButton(inSim, {
    ...inputButtonProps(4),
    L: 117,
    T: IS_Y_MIN + BUTTON_HEIGHT * 4,
    W: 8,
    Text: buttonNumberTextWithCaption('FOV (degrees)', fov),
    onType: ({ packet, button }) => {
      const parsedValue = parseInt(packet.Text, 10);
      !isNaN(parsedValue) && (fov = parsedValue);

      button.update({
        ReqI: 1,
        Text: buttonNumberTextWithCaption('FOV (degrees)', fov),
      });
    },
  });

  drawButton(inSim, {
    Text: 'FOV:',
    ReqI: 1,
    L: 112,
    T: IS_Y_MIN + BUTTON_HEIGHT * 4,
    W: 10,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_C2 | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    Text: 'Time:',
    ReqI: 1,
    L: 125,
    T: IS_Y_MIN + BUTTON_HEIGHT * 4,
    W: 10,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_C2 | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    ...inputButtonProps(5),
    L: 131,
    T: IS_Y_MIN + BUTTON_HEIGHT * 4,
    W: 8,
    Text: buttonNumberTextWithCaption('Time (ms)', time),
    onType: ({ packet, button }) => {
      const parsedValue = parseInt(packet.Text, 10);
      !isNaN(parsedValue) && (time = parsedValue);

      button.update({
        ReqI: 1,
        Text: buttonNumberTextWithCaption('Time (ms)', time),
      });
    },
  });

  drawButton(inSim, {
    Text: 'ViewPLID:',
    ReqI: 1,
    L: 139,
    T: IS_Y_MIN + BUTTON_HEIGHT * 4,
    W: 10,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_C2 | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    ...inputButtonProps(3),
    L: 148,
    T: IS_Y_MIN + BUTTON_HEIGHT * 4,
    W: 4,
    Text: buttonNumberTextWithCaption('ViewPLID', viewPLID),
    onType: ({ packet, button }) => {
      const parsedValue = parseInt(packet.Text, 10);
      !isNaN(parsedValue) && (viewPLID = parsedValue);

      button.update({
        ReqI: 1,
        Text: buttonNumberTextWithCaption('ViewPLID', viewPLID),
      });
    },
  });

  drawButton(inSim, {
    Text: 'InGameCam:',
    ReqI: 1,
    L: 152,
    T: IS_Y_MIN + BUTTON_HEIGHT * 4,
    W: 11,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_C2 | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    ...buttonProps(),
    L: 163,
    T: IS_Y_MIN + BUTTON_HEIGHT * 4,
    W: 10,
    Text: `[${VIEW_IDENTIFIERS[inGameCam]}]`,
    onClick: ({ button }) => {
      const viewIdentifierIds = Object.keys(VIEW_IDENTIFIERS);
      const identifierId = viewIdentifierIds.findIndex(
        (identifier) => identifier === inGameCam.toString(10),
      );

      const nextId =
        identifierId === viewIdentifierIds.length - 1
          ? viewIdentifierIds[0]
          : viewIdentifierIds[identifierId + 1];
      inGameCam = parseInt(nextId, 10);

      button.update({
        ReqI: 1,
        Text: `[${VIEW_IDENTIFIERS[inGameCam]}]`,
      });
    },
  });
}

function buttonNumberTextWithCaption(caption: string, number: number): string {
  return buttonTextWithCaption(caption, number.toString(10));
}

const buttonProps = (): ButtonData => ({
  ReqI: 1,
  // L: offset,
  T: IS_Y_MIN + BUTTON_HEIGHT * 3,
  // W: INPUT_BUTTONS_WIDTH,
  H: BUTTON_HEIGHT,
  BStyle: ButtonStyle.ISB_LIGHT | ButtonStyle.ISB_C2 | ButtonStyle.ISB_CLICK,
});

const inputButtonProps = (typeIn: number): ButtonData => ({
  ...buttonProps(),
  TypeIn: typeIn + TypeIn.INIT_VALUE_BUTTON_TEXT,
  BStyle:
    ButtonStyle.ISB_LIGHT | ButtonTextColour.TextString | ButtonStyle.ISB_CLICK,
});
