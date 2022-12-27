import {
  ButtonStyle,
  ButtonTextColour,
  CharacterModifiers,
  IS_SCH,
  IS_Y_MIN,
} from '../../../../../../src/packets';
import type { InSim } from '../../../../../../src/protocols';
import { buttonTextWithCaption, drawButton } from '../../../ui';
import type { ButtonData } from '../../../ui/button';
import { BUTTON_HEIGHT } from '../constants';

export function drawSingleCharacterPacketButtons(inSim: InSim) {
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
    onType: ({ packet, inSim }) => {
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
    onClick: ({ button }) => {
      buttonFlags =
        buttonFlags & CharacterModifiers.SHIFT
          ? buttonFlags & ~CharacterModifiers.SHIFT
          : buttonFlags | CharacterModifiers.SHIFT;
      button.update(getShiftButtonData(isShiftEnabled(buttonFlags)));
    },
  });
  drawButton(inSim, {
    ...getCtrlButtonData(isCtrlEnabled(buttonFlags)),
    onClick: ({ button }) => {
      buttonFlags =
        buttonFlags & CharacterModifiers.CTRL
          ? buttonFlags & ~CharacterModifiers.CTRL
          : buttonFlags | CharacterModifiers.CTRL;
      button.update(getCtrlButtonData(isCtrlEnabled(buttonFlags)));
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
