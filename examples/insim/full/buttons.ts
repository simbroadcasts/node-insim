import type { IS_BTN_Data } from '../../../src/packets';
import { ButtonTextColour, IS_BTN } from '../../../src/packets';
import type { InSim } from '../../../src/protocols';

export type ButtonListProps = {
  title?: string;
  titleClickId?: number;
  leftOffset: number;
  topOffset: number;
  width: number;
  height: number;
  buttons: Partial<Omit<IS_BTN_Data, 'ReqI' | 'L' | 'T' | 'W' | 'H'>>[];
};

export function drawButtonList(
  inSim: InSim,
  {
    title,
    titleClickId = 0,
    leftOffset,
    topOffset,
    width,
    height,
    buttons,
  }: ButtonListProps,
) {
  const left = leftOffset;
  let top = topOffset;
  let clickId = titleClickId;

  if (title) {
    const titleButton = new IS_BTN({
      ReqI: 1,
      ClickID: clickId,
      W: width,
      H: height,
      L: left,
      T: top,
      BStyle: ButtonTextColour.TitleColour,
      Text: title,
    });

    inSim.send(titleButton);

    clickId++;
    top += height;
  }

  buttons.forEach(({ ClickID, ...button }) => {
    const actualClickId = ClickID ?? clickId;
    const btn = new IS_BTN({
      ReqI: 1,
      ClickID: actualClickId,
      W: width,
      H: height,
      L: left,
      T: top,
      ...button,
    });

    inSim.send(btn);

    clickId++;
    top += height;
  });
}

export function buttonTextWithCaption(caption: string, text: string) {
  const zero = String.fromCharCode(0);

  return `${zero}${caption}${zero}${text}`;
}
