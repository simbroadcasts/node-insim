import type { IS_BTN_Data } from '../../../../src/packets';
import { ButtonTextColour } from '../../../../src/packets';
import type { InSim } from '../../../../src/protocols';
import type { CustomButtonProps, DrawButtonConfig } from './button';
import { drawButton } from './button';

export type Button = Partial<Omit<IS_BTN_Data, ComputedButtonProps>> &
  CustomButtonProps;

type ComputedButtonProps = 'ClickID' | 'L' | 'T' | 'W' | 'H';

export type ButtonListProps = {
  title?: string;
  leftOffset: number;
  topOffset: number;
  width: number;
  height: number;
  buttons: Button[];
};

export type ButtonListConfig = {
  update: (buttons: Button[]) => void;
};

export function drawButtonList(
  inSim: InSim,
  {
    title,
    leftOffset: left,
    topOffset,
    width,
    height,
    buttons,
  }: ButtonListProps,
): ButtonListConfig {
  let top = topOffset;

  if (title) {
    drawNextButton(inSim, {
      Text: title,
      BStyle: ButtonTextColour.TitleColour,
    });
  }

  const createdButtons: DrawButtonConfig[] = buttons.map((button) =>
    drawNextButton(inSim, button),
  );

  function drawNextButton(inSim: InSim, button: Button): DrawButtonConfig {
    const buttonConfig = drawButton(inSim, {
      ReqI: 1,
      W: width,
      H: height,
      L: left,
      T: top,
      ...button,
    });

    top += height;

    return buttonConfig;
  }

  return {
    update: (buttons) => {
      let top = topOffset;

      if (title) {
        top += height;
      }

      createdButtons.forEach(({ update }, idx) => {
        update({
          ReqI: 1,
          W: width,
          H: height,
          L: left,
          T: top,
          ...buttons[idx],
        });
        top += height;
      });
    },
  };
}
