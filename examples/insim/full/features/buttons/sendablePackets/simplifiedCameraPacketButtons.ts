import {
  ButtonStyle,
  ButtonTextColour,
  IS_SCC,
  IS_Y_MIN,
  TypeIn,
  ViewIdentifier,
} from '../../../../../../src/packets';
import type { InSim } from '../../../../../../src/protocols';
import { VIEW_IDENTIFIERS } from '../../../constants';
import { buttonTextWithCaption, drawButton } from '../../../ui';
import { BUTTON_HEIGHT } from '../constants';

export function drawSimplifiedCameraPacketButtons(inSim: InSim) {
  let viewPLID = 1;
  let inGameCam: ViewIdentifier = ViewIdentifier.VIEW_FOLLOW;

  drawButton(inSim, {
    Text: 'IS_SCC',
    ReqI: 1,
    L: 97,
    T: IS_Y_MIN + BUTTON_HEIGHT * 2,
    W: 15,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_DARK | ButtonStyle.ISB_CLICK,
    onClick: () => {
      inSim.send(
        new IS_SCC({
          ViewPLID: viewPLID,
          InGameCam: inGameCam,
        }),
      );
    },
  });

  drawButton(inSim, {
    Text: 'ViewPLID:',
    ReqI: 1,
    L: 112,
    T: IS_Y_MIN + BUTTON_HEIGHT * 2,
    W: 12,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_C2 | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    Text: buttonTextWithCaption('Enter a PLID to view', viewPLID.toString(10)),
    ReqI: 1,
    L: 124,
    T: IS_Y_MIN + BUTTON_HEIGHT * 2,
    W: 4,
    H: BUTTON_HEIGHT,
    TypeIn: 3 + TypeIn.INIT_VALUE_BUTTON_TEXT,
    BStyle:
      ButtonStyle.ISB_LIGHT |
      ButtonStyle.ISB_CLICK |
      ButtonTextColour.TextString,
    onType: (packet, _inSim, { update }) => {
      const parsedNumber = parseInt(packet.Text, 10);

      if (isNaN(parsedNumber)) {
        return;
      }

      viewPLID = parsedNumber;
      update({
        ReqI: 1,
        Text: buttonTextWithCaption(
          'Enter a PLID to view',
          viewPLID.toString(10),
        ),
      });
    },
  });

  drawButton(inSim, {
    Text: 'InGameCam:',
    ReqI: 1,
    L: 112,
    T: IS_Y_MIN + BUTTON_HEIGHT * 3,
    W: 12,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_C2 | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    Text: `[${VIEW_IDENTIFIERS[inGameCam]}]`,
    ReqI: 1,
    L: 124,
    T: IS_Y_MIN + BUTTON_HEIGHT * 3,
    W: 10,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_LIGHT | ButtonStyle.ISB_CLICK | ButtonStyle.ISB_C2,
    onClick: (_packet, _inSim, { update }) => {
      const viewIdentifierIds = Object.keys(VIEW_IDENTIFIERS);
      const identifierId = viewIdentifierIds.findIndex(
        (identifier) => identifier === inGameCam.toString(10),
      );

      const nextId =
        identifierId === viewIdentifierIds.length - 1
          ? viewIdentifierIds[0]
          : viewIdentifierIds[identifierId + 1];
      inGameCam = parseInt(nextId, 10);

      update({
        ReqI: 1,
        Text: `[${VIEW_IDENTIFIERS[inGameCam]}]`,
      });
    },
  });
}
