import { ButtonStyle, ButtonTextColour, IS_BTN } from '../../../src/packets';
import type { InSim } from '../../../src/protocols';
import { generateUniqueReqId } from './uniqueId';

export function drawButtonList(
  inSim: InSim,
  {
    title,
    leftOffset,
    topOffset,
    buttons,
  }: {
    title: string;
    leftOffset: number;
    topOffset: number;
    buttons: {
      text: string;
      clickId: number;
    }[];
  },
) {
  const left = leftOffset;
  let top = topOffset;
  const width = 20;
  const height = 4;

  inSim.send(
    new IS_BTN({
      ReqI: generateUniqueReqId(),
      W: width,
      H: height,
      L: left,
      T: top,
      BStyle: ButtonTextColour.TitleColour,
      Text: title,
    }),
  );

  top += height;

  buttons.forEach(({ text, clickId }) => {
    const btn = new IS_BTN({
      ReqI: generateUniqueReqId(),
      ClickID: clickId,
      W: width,
      H: height,
      L: left,
      T: top,
      BStyle: ButtonStyle.ISB_DARK | ButtonStyle.ISB_CLICK,
      Text: text,
    });

    inSim.send(btn);

    top += height;
  });
}
