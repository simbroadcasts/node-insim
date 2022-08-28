import { ButtonTextColour, IS_Y_MIN } from '../../../../../../src/packets';
import type { InSim } from '../../../../../../src/protocols';
import { drawButton } from '../../../ui';
import { BUTTON_HEIGHT } from '../constants';
import { drawCameraPositionPacketButtons } from './cameraPositionPacketButtons';
import { drawSimplifiedCameraPacketButtons } from './simplifiedCameraPacketButtons';
import { drawSingleCharacterPacketButtons } from './singleCharacterPacketButtons';

export function drawSendablePacketButtons(inSim: InSim) {
  drawButton(inSim, {
    Text: 'Sendable packets',
    ReqI: 1,
    L: 97,
    T: IS_Y_MIN,
    W: 15,
    H: BUTTON_HEIGHT,
    BStyle: ButtonTextColour.TitleColour,
  });
  drawSingleCharacterPacketButtons(inSim);
  drawSimplifiedCameraPacketButtons(inSim);
  drawCameraPositionPacketButtons(inSim);
}
