import type { SendableStateFlags } from '../../../../../src/packets';
import {
  ButtonStyle,
  ButtonTextColour,
  IS_SFP,
  IS_TINY,
  IS_X_MIN,
  IS_Y_MIN,
  PacketType,
  StateFlags,
  TinyType,
} from '../../../../../src/packets';
import type { InSim } from '../../../../../src/protocols';
import { drawButtonList } from '../../ui';
import type { Button } from '../../ui/buttonList';
import { getStringEnumValues } from '../../utils';
import { BUTTON_HEIGHT } from './constants';

const stateFlagEnumValues = getStringEnumValues(StateFlags);

export function drawStateFlagsButtons(inSim: InSim) {
  inSim.send(
    new IS_TINY({
      ReqI: 1,
      SubT: TinyType.TINY_SST,
    }),
  );

  const buttons: Button[] = stateFlagEnumValues.map((stateFlag) => {
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
    buttons,
  });

  inSim.on(PacketType.ISP_STA, (packet) => {
    const valueButtons: Button[] = stateFlagEnumValues.map((stateFlag) => {
      const stateNumber = StateFlags[stateFlag];
      const isOn = packet.Flags & stateNumber;
      const isSendable = isSendableState(stateNumber);

      const onClick = isSendable
        ? () => {
            inSim.send(
              new IS_SFP({
                Flag: stateNumber,
                OffOn: isOn ? 0 : 1,
              }),
            );
          }
        : undefined;

      return {
        Text: `${stateFlag} (${stateNumber})`,
        BStyle:
          ButtonStyle.ISB_LIGHT |
          (isOn ? ButtonTextColour.SelectedText : ButtonStyle.ISB_C2) |
          (isSendable ? ButtonStyle.ISB_CLICK : ButtonStyle.ISB_LIGHT),
        onClick,
      };
    });

    updateStateFlagButtons(valueButtons);
  });
}

function isSendableState(
  stateFlag: StateFlags,
): stateFlag is SendableStateFlags {
  const sendableStates: SendableStateFlags[] = [
    StateFlags.ISS_SHIFTU_NO_OPT,
    StateFlags.ISS_MPSPEEDUP,
    StateFlags.ISS_SOUND_MUTE,
    StateFlags.ISS_SHOW_2D,
  ];

  return sendableStates.includes(stateFlag as SendableStateFlags);
}
