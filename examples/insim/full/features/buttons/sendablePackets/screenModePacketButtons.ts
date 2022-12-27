import {
  ButtonStyle,
  ButtonTextColour,
  IS_MOD,
  IS_Y_MIN,
  TypeIn,
} from '../../../../../../src/packets';
import type { InSim } from '../../../../../../src/protocols';
import { buttonTextWithCaption, drawButton } from '../../../ui';
import { BUTTON_HEIGHT } from '../constants';

export function drawScreenModePacketButtons(inSim: InSim) {
  let bits16 = 0,
    refreshRate = 0,
    width = 0,
    height = 0;

  drawButton(inSim, {
    Text: buttonTextWithCaption('Message', 'IS_MOD'),
    ReqI: 1,
    L: 97,
    T: IS_Y_MIN + BUTTON_HEIGHT * 8,
    W: 15,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_DARK | ButtonStyle.ISB_CLICK,
    onClick: () => {
      inSim.send(
        new IS_MOD({
          Bits16: bits16,
          RR: refreshRate,
          Width: width,
          Height: height,
        }),
      );
    },
  });

  drawButton(inSim, {
    Text: 'Bits16:',
    ReqI: 1,
    L: 112,
    T: IS_Y_MIN + BUTTON_HEIGHT * 8,
    W: 12,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_C2 | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    Text: buttonTextWithCaption('Set to choose 16-bit', bits16.toString(10)),
    ReqI: 1,
    L: 119,
    T: IS_Y_MIN + BUTTON_HEIGHT * 8,
    W: 4,
    H: BUTTON_HEIGHT,
    TypeIn: 3 + TypeIn.INIT_VALUE_BUTTON_TEXT,
    BStyle:
      ButtonStyle.ISB_LIGHT |
      ButtonStyle.ISB_CLICK |
      ButtonTextColour.TextString,
    onType: ({ packet, button }) => {
      const parsedNumber = parseInt(packet.Text, 10);

      if (isNaN(parsedNumber)) {
        return;
      }

      bits16 = parsedNumber;
      button.update({
        ReqI: 1,
        Text: buttonTextWithCaption(
          'Set to choose 16-bit',
          bits16.toString(10),
        ),
      });
    },
  });

  drawButton(inSim, {
    Text: 'RR:',
    ReqI: 1,
    L: 124,
    T: IS_Y_MIN + BUTTON_HEIGHT * 8,
    W: 12,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_C2 | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    Text: buttonTextWithCaption(
      'Refresh rate - zero for default',
      refreshRate.toString(10),
    ),
    ReqI: 1,
    L: 128,
    T: IS_Y_MIN + BUTTON_HEIGHT * 8,
    W: 4,
    H: BUTTON_HEIGHT,
    TypeIn: 3 + TypeIn.INIT_VALUE_BUTTON_TEXT,
    BStyle:
      ButtonStyle.ISB_LIGHT |
      ButtonStyle.ISB_CLICK |
      ButtonTextColour.TextString,
    onType: ({ packet, button }) => {
      const parsedNumber = parseInt(packet.Text, 10);

      if (isNaN(parsedNumber)) {
        return;
      }

      refreshRate = parsedNumber;
      button.update({
        ReqI: 1,
        Text: buttonTextWithCaption(
          'Refresh rate - zero for default',
          refreshRate.toString(10),
        ),
      });
    },
  });

  drawButton(inSim, {
    Text: 'Width:',
    ReqI: 1,
    L: 132,
    T: IS_Y_MIN + BUTTON_HEIGHT * 8,
    W: 12,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_C2 | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    Text: buttonTextWithCaption(
      'Width - 0 means go to window',
      width.toString(10),
    ),
    ReqI: 1,
    L: 138,
    T: IS_Y_MIN + BUTTON_HEIGHT * 8,
    W: 4,
    H: BUTTON_HEIGHT,
    TypeIn: 3 + TypeIn.INIT_VALUE_BUTTON_TEXT,
    BStyle:
      ButtonStyle.ISB_LIGHT |
      ButtonStyle.ISB_CLICK |
      ButtonTextColour.TextString,
    onType: ({ packet, button }) => {
      const parsedNumber = parseInt(packet.Text, 10);

      if (isNaN(parsedNumber)) {
        return;
      }

      width = parsedNumber;
      button.update({
        ReqI: 1,
        Text: buttonTextWithCaption(
          'Width - 0 means go to window',
          width.toString(10),
        ),
      });
    },
  });

  drawButton(inSim, {
    Text: 'Height:',
    ReqI: 1,
    L: 143,
    T: IS_Y_MIN + BUTTON_HEIGHT * 8,
    W: 12,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_C2 | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    Text: buttonTextWithCaption(
      'Height - 0 means go to window',
      height.toString(10),
    ),
    ReqI: 1,
    L: 150,
    T: IS_Y_MIN + BUTTON_HEIGHT * 8,
    W: 4,
    H: BUTTON_HEIGHT,
    TypeIn: 3 + TypeIn.INIT_VALUE_BUTTON_TEXT,
    BStyle:
      ButtonStyle.ISB_LIGHT |
      ButtonStyle.ISB_CLICK |
      ButtonTextColour.TextString,
    onType: ({ packet, button }) => {
      const parsedNumber = parseInt(packet.Text, 10);

      if (isNaN(parsedNumber)) {
        return;
      }

      height = parsedNumber;
      button.update({
        ReqI: 1,
        Text: buttonTextWithCaption(
          'Height - 0 means go to window',
          height.toString(10),
        ),
      });
    },
  });
}
