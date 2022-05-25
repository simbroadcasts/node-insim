import { ButtonStyle, ButtonTextColour } from '../../../../../src/packets';
import type { InSim } from '../../../../../src/protocols';
import type { ButtonListProps } from '../../ui';
import { drawButtonList } from '../../ui';
import { getStringEnumValues } from '../../utils';

export function drawButtonVariants(inSim: InSim) {
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
