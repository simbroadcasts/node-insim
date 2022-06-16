import {
  ButtonStyle,
  ButtonTextColour,
  IS_TINY,
  IS_X_MIN,
  IS_Y_MIN,
  PacketType,
  StateFlags,
  TinyType,
} from '../../../../../src/packets';
import type { InSim } from '../../../../../src/protocols';
import type { ButtonListProps } from '../../ui';
import { drawButtonList } from '../../ui';
import { getStringEnumValues } from '../../utils';
import { BUTTON_HEIGHT } from './constants';

export function drawStateFlagsButtons(inSim: InSim) {
  inSim.send(
    new IS_TINY({
      ReqI: 1,
      SubT: TinyType.TINY_SST,
    }),
  );

  const valueButtons: ButtonListProps['buttons'] = getStringEnumValues(
    StateFlags,
  ).map((stateFlag) => {
    const stateNumber = StateFlags[stateFlag];

    return {
      Text: `${stateFlag} (${stateNumber})`,
      BStyle: ButtonStyle.ISB_LIGHT | ButtonStyle.ISB_C2,
    };
  });

  const { update: updateStateFlagButtons } = drawButtonList(inSim, {
    title: 'State flags',
    leftOffset: IS_X_MIN + 25,
    topOffset: IS_Y_MIN,
    width: 22,
    height: BUTTON_HEIGHT,
    buttons: valueButtons,
  });

  inSim.on(PacketType.ISP_STA, (packet) => {
    const valueButtons: ButtonListProps['buttons'] = getStringEnumValues(
      StateFlags,
    ).map((stateFlag) => {
      const stateNumber = StateFlags[stateFlag];
      const isOn = packet.Flags & stateNumber;

      return {
        Text: `${stateFlag} (${stateNumber})`,
        BStyle:
          ButtonStyle.ISB_LIGHT |
          (isOn ? ButtonTextColour.SelectedText : ButtonStyle.ISB_C2),
      };
    });

    updateStateFlagButtons(valueButtons);
  });
}
