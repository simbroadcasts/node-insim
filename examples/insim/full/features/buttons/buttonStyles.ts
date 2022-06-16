import {
  ButtonStyle,
  ButtonTextColour,
  IS_Y_MIN,
} from '../../../../../src/packets';
import type { InSim } from '../../../../../src/protocols';
import type { ButtonListProps } from '../../ui';
import { drawButtonList } from '../../ui';
import { getStringEnumValues } from '../../utils';
import { BUTTON_HEIGHT } from './constants';

export function drawButtonStyles(inSim: InSim) {
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
    leftOffset: 47,
    topOffset: IS_Y_MIN,
    width: 20,
    height: BUTTON_HEIGHT,
    buttons,
  });
}
