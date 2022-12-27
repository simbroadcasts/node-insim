import {
  ButtonStyle,
  ButtonTextColour,
  IS_MTC,
  IS_Y_MIN,
  TypeIn,
} from '../../../../../../src/packets';
import { MessageSounds } from '../../../../../../src/packets/enums/MessageSounds';
import type { InSim } from '../../../../../../src/protocols';
import { buttonTextWithCaption, drawButton } from '../../../ui';
import { BUTTON_HEIGHT } from '../constants';

export function drawMessageToConnectionPacketButtons(inSim: InSim) {
  let UCID = 0,
    PLID = 0;
  let sound: MessageSounds = MessageSounds.SND_SILENT;

  drawButton(inSim, {
    Text: buttonTextWithCaption('Message', 'IS_MTC'),
    ReqI: 1,
    L: 97,
    T: IS_Y_MIN + BUTTON_HEIGHT * 7,
    W: 15,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_DARK | ButtonStyle.ISB_CLICK,
    TypeIn: 127,
    onType: ({ packet }) => {
      inSim.send(
        new IS_MTC({
          Sound: sound,
          PLID,
          UCID,
          Text: packet.Text,
        }),
      );
    },
  });

  drawButton(inSim, {
    Text: 'UCID:',
    ReqI: 1,
    L: 112,
    T: IS_Y_MIN + BUTTON_HEIGHT * 7,
    W: 12,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_C2 | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    Text: buttonTextWithCaption('UCID', UCID.toString(10)),
    ReqI: 1,
    L: 117,
    T: IS_Y_MIN + BUTTON_HEIGHT * 7,
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

      UCID = parsedNumber;
      button.update({
        ReqI: 1,
        Text: buttonTextWithCaption('UCID', UCID.toString(10)),
      });
    },
  });

  drawButton(inSim, {
    Text: 'PLID:',
    ReqI: 1,
    L: 122,
    T: IS_Y_MIN + BUTTON_HEIGHT * 7,
    W: 12,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_C2 | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    Text: buttonTextWithCaption('PLID', PLID.toString(10)),
    ReqI: 1,
    L: 127,
    T: IS_Y_MIN + BUTTON_HEIGHT * 7,
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

      PLID = parsedNumber;
      button.update({
        ReqI: 1,
        Text: buttonTextWithCaption('PLID', PLID.toString(10)),
      });
    },
  });

  drawButton(inSim, {
    Text: 'Sound:',
    ReqI: 1,
    L: 132,
    T: IS_Y_MIN + BUTTON_HEIGHT * 7,
    W: 12,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_C2 | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    Text: `[${MessageSounds[sound]}]`,
    ReqI: 1,
    L: 139,
    T: IS_Y_MIN + BUTTON_HEIGHT * 7,
    W: 17,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_LIGHT | ButtonStyle.ISB_CLICK | ButtonStyle.ISB_C2,
    onClick: ({ button }) => {
      const viewIdentifierIds = Object.keys(MessageSounds).filter(
        (key) => !isNaN(Number(MessageSounds[key as unknown as number])),
      );
      const identifierId = viewIdentifierIds.findIndex(
        (identifier) => identifier === MessageSounds[sound],
      );

      sound =
        identifierId === viewIdentifierIds.length - 1 ? 0 : identifierId + 1;

      button.update({
        ReqI: 1,
        Text: `[${MessageSounds[sound]}]`,
      });
    },
  });
}
