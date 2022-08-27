import type { IS_BTT } from '../../../../../src/packets';
import {
  ButtonStyle,
  ButtonTextColour,
  CharacterModifiers,
  IS_SCC,
  IS_SCH,
  IS_Y_MIN,
  ViewIdentifier,
} from '../../../../../src/packets';
import type { InSim } from '../../../../../src/protocols';
import { buttonTextWithCaption, drawButton } from '../../ui';
import type { ButtonData } from '../../ui/button';
import { BUTTON_HEIGHT } from './constants';

export function drawSendablePacketButtons(inSim: InSim) {
  drawButton(inSim, {
    Text: 'Sendable packets',
    ReqI: 1,
    L: 97,
    T: IS_Y_MIN,
    W: 15,
    H: BUTTON_HEIGHT,
    BStyle: ButtonTextColour.TitleColour,
  });
  drawSingleCharacterPacketButtons(inSim);
  drawSimplifiedCameraPacketButtons(inSim);
}

function drawSingleCharacterPacketButtons(inSim: InSim) {
  let buttonFlags: CharacterModifiers = 0;

  const isShiftEnabled = (flags: CharacterModifiers) =>
    Boolean(flags & CharacterModifiers.SHIFT);
  const isCtrlEnabled = (flags: CharacterModifiers) =>
    Boolean(flags & CharacterModifiers.CTRL);

  drawButton(inSim, {
    Text: buttonTextWithCaption('Enter a character to send', 'IS_SCH'),
    ReqI: 1,
    L: 97,
    T: IS_Y_MIN + BUTTON_HEIGHT,
    W: 15,
    H: BUTTON_HEIGHT,
    TypeIn: 1,
    BStyle: ButtonStyle.ISB_DARK | ButtonStyle.ISB_CLICK,
    onType: (packet: IS_BTT, inSim: InSim) => {
      inSim.send(
        new IS_SCH({
          CharB: packet.Text.charCodeAt(0),
          Flags: buttonFlags,
        }),
      );
    },
  });

  drawButton(inSim, {
    ...getShiftButtonData(isShiftEnabled(buttonFlags)),
    onClick: (_packet, _inSim, { update }) => {
      buttonFlags =
        buttonFlags & CharacterModifiers.SHIFT
          ? buttonFlags & ~CharacterModifiers.SHIFT
          : buttonFlags | CharacterModifiers.SHIFT;
      update(getShiftButtonData(isShiftEnabled(buttonFlags)));
    },
  });
  drawButton(inSim, {
    ...getCtrlButtonData(isCtrlEnabled(buttonFlags)),
    onClick: (_packet, _inSim, { update }) => {
      buttonFlags =
        buttonFlags & CharacterModifiers.CTRL
          ? buttonFlags & ~CharacterModifiers.CTRL
          : buttonFlags | CharacterModifiers.CTRL;
      update(getCtrlButtonData(isCtrlEnabled(buttonFlags)));
    },
  });

  function getShiftButtonData(isEnabled: boolean): ButtonData {
    return {
      Text: 'Shift',
      ReqI: 1,
      L: 112,
      T: IS_Y_MIN + BUTTON_HEIGHT,
      W: 5,
      H: BUTTON_HEIGHT,
      BStyle:
        ButtonStyle.ISB_LIGHT |
        ButtonStyle.ISB_CLICK |
        (isEnabled ? ButtonTextColour.SelectedText : ButtonStyle.ISB_C2),
    };
  }

  function getCtrlButtonData(isEnabled: boolean): ButtonData {
    return {
      Text: 'Ctrl',
      ReqI: 1,
      L: 117,
      T: IS_Y_MIN + BUTTON_HEIGHT,
      W: 5,
      H: BUTTON_HEIGHT,
      BStyle:
        ButtonStyle.ISB_LIGHT |
        ButtonStyle.ISB_CLICK |
        (isEnabled ? ButtonTextColour.SelectedText : ButtonStyle.ISB_C2),
    };
  }
}

const VIEW_IDENTIFIERS: Record<ViewIdentifier, string> = {
  [ViewIdentifier.VIEW_FOLLOW]: 'follow',
  [ViewIdentifier.VIEW_HELI]: 'heli',
  [ViewIdentifier.VIEW_CAM]: 'external',
  [ViewIdentifier.VIEW_DRIVER]: 'in car',
  [ViewIdentifier.VIEW_CUSTOM]: 'custom',
};

function drawSimplifiedCameraPacketButtons(inSim: InSim) {
  let viewPLID = 1;
  let inGameCam: ViewIdentifier = ViewIdentifier.VIEW_FOLLOW;

  drawButton(inSim, {
    Text: 'IS_SCC',
    ReqI: 1,
    L: 97,
    T: IS_Y_MIN + BUTTON_HEIGHT * 2,
    W: 15,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_DARK | ButtonStyle.ISB_CLICK,
    onClick: () => {
      inSim.send(
        new IS_SCC({
          ViewPLID: viewPLID,
          InGameCam: inGameCam,
        }),
      );
    },
  });

  drawButton(inSim, {
    Text: 'ViewPLID:',
    ReqI: 1,
    L: 112,
    T: IS_Y_MIN + BUTTON_HEIGHT * 2,
    W: 12,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_C2 | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    Text: buttonTextWithCaption('Enter a PLID to view', viewPLID.toString(10)),
    ReqI: 1,
    L: 124,
    T: IS_Y_MIN + BUTTON_HEIGHT * 2,
    W: 4,
    H: BUTTON_HEIGHT,
    TypeIn: 3 + 128,
    BStyle:
      ButtonStyle.ISB_LIGHT |
      ButtonStyle.ISB_CLICK |
      ButtonTextColour.TextString,
    onType: (packet, _inSim, { update }) => {
      const parsedNumber = parseInt(packet.Text, 10);

      if (isNaN(parsedNumber)) {
        return;
      }

      viewPLID = parsedNumber;
      update({
        ReqI: 1,
        Text: buttonTextWithCaption(
          'Enter a PLID to view',
          viewPLID.toString(10),
        ),
      });
    },
  });

  drawButton(inSim, {
    Text: 'InGameCam:',
    ReqI: 1,
    L: 112,
    T: IS_Y_MIN + BUTTON_HEIGHT * 3,
    W: 12,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_C2 | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    Text: `[${VIEW_IDENTIFIERS[inGameCam]}]`,
    ReqI: 1,
    L: 124,
    T: IS_Y_MIN + BUTTON_HEIGHT * 3,
    W: 10,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_LIGHT | ButtonStyle.ISB_CLICK | ButtonStyle.ISB_C2,
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
