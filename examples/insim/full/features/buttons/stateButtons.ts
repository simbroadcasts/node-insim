import {
  ButtonStyle,
  IS_X_MIN,
  IS_Y_MIN,
  PacketType,
  RaceState,
  ServerStatus,
  ViewIdentifier,
  Wind,
} from '../../../../../src/packets';
import type { InSim } from '../../../../../src/protocols';
import { drawButtonList } from '../../ui';
import { lfsRaceLapsToLapsOrHours } from '../../utils';
import { BUTTON_HEIGHT } from './constants';

export function drawStateButtons(inSim: InSim) {
  const buttonPairs: Record<string, string> = {
    'Replay speed': '-',
    'Selected camera': '-',
    'View PLID': '-',
    'Players on track': '-',
    Connections: '-',
    'Finished / qualified': '-',
    'Race state': '-',
    'Qualifying minutes': '-',
    'Race laps / hours': '-',
    'Server status': '-',
    Track: '-',
    Weather: '-',
    Wind: '-',
  };

  drawButtonList(inSim, {
    title: 'Game state',
    leftOffset: IS_X_MIN,
    topOffset: IS_Y_MIN,
    width: 15,
    height: BUTTON_HEIGHT,
    buttons: Object.keys(buttonPairs).map((text) => ({
      Text: text,
      BStyle: ButtonStyle.ISB_LIGHT | ButtonStyle.ISB_C2 | ButtonStyle.ISB_LEFT,
    })),
  });

  const { update: updateStateButtons } = drawButtonList(inSim, {
    leftOffset: IS_X_MIN + 15,
    topOffset: IS_Y_MIN + BUTTON_HEIGHT,
    width: 10,
    height: BUTTON_HEIGHT,
    buttons: Object.values(buttonPairs).map((text) => ({
      Text: text,
      BStyle: ButtonStyle.ISB_LIGHT | ButtonStyle.ISB_C2,
    })),
  });

  inSim.on(PacketType.ISP_STA, (packet) => {
    const buttonPairs: Record<string, string> = {
      'Replay speed': packet.ReplaySpeed.toFixed(3),
      'Selected camera': views[packet.InGameCam],
      'View PLID': packet.ViewPLID.toString(10),
      'Players on track': packet.NumP.toString(10),
      Connections: packet.NumConns.toString(10),
      'Finished / qualified': packet.NumFinished.toString(10),
      'Race state': raceStates[packet.RaceInProg],
      'Qualifying minutes': packet.QualMins.toString(10),
      'Race laps / hours': lfsRaceLapsToLapsOrHours(packet.RaceLaps),
      'Server status': getServerStatus(packet.ServerStatus),
      Track: packet.Track,
      Weather: packet.Weather.toString(10),
      Wind: windStrengths[packet.Wind],
    };

    updateStateButtons(
      Object.values(buttonPairs).map((text) => ({
        Text: text,
        BStyle: ButtonStyle.ISB_LIGHT | ButtonStyle.ISB_C2,
      })),
    );
  });
}

function getServerStatus(status: ServerStatus) {
  if (status === ServerStatus.Success) {
    return 'success';
  }

  if (status === ServerStatus.Unknown) {
    return 'unknown';
  }

  return 'fail';
}

const views: Record<ViewIdentifier, string> = {
  [ViewIdentifier.VIEW_FOLLOW]: 'follow',
  [ViewIdentifier.VIEW_HELI]: 'heli',
  [ViewIdentifier.VIEW_CAM]: 'external',
  [ViewIdentifier.VIEW_DRIVER]: 'in car',
  [ViewIdentifier.VIEW_CUSTOM]: 'custom',
};

const raceStates: Record<RaceState, string> = {
  [RaceState.Race]: 'race',
  [RaceState.Qualifying]: 'qualifying',
  [RaceState.NoRace]: 'no race',
};

const windStrengths: Record<Wind, string> = {
  [Wind.Off]: 'no wind',
  [Wind.Weak]: 'low wind',
  [Wind.Strong]: 'high wind',
};
