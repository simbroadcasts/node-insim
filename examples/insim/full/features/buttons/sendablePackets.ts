import type { IS_BTT } from '../../../../../src/packets';
import {
  ButtonStyle,
  ButtonTextColour,
  CharacterModifiers,
  IS_SCH,
  IS_Y_MIN,
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
}

function drawSingleCharacterPacketButtons(inSim: InSim) {
  let buttonFlags: CharacterModifiers = 0;

  drawButton(inSim, {
    Text: buttonTextWithCaption(`Enter a character to send`, 'IS_SCH'),
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

  drawShiftButton(inSim);
  drawCtrlButton(inSim);

  function drawShiftButton(inSim: InSim) {
    const { update } = drawButton(inSim, {
      ...getShiftButtonData(Boolean(buttonFlags & CharacterModifiers.SHIFT)),
      onClick: () => {
        buttonFlags =
          buttonFlags & CharacterModifiers.SHIFT
            ? buttonFlags & ~CharacterModifiers.SHIFT
            : buttonFlags | CharacterModifiers.SHIFT;
        update(
          getShiftButtonData(Boolean(buttonFlags & CharacterModifiers.SHIFT)),
        );
      },
    });
  }

  function drawCtrlButton(inSim: InSim) {
    const { update } = drawButton(inSim, {
      ...getCtrlButtonData(Boolean(buttonFlags & CharacterModifiers.CTRL)),
      onClick: () => {
        buttonFlags =
          buttonFlags & CharacterModifiers.CTRL
            ? buttonFlags & ~CharacterModifiers.CTRL
            : buttonFlags | CharacterModifiers.CTRL;
        update(
          getCtrlButtonData(Boolean(buttonFlags & CharacterModifiers.CTRL)),
        );
      },
    });
  }

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
