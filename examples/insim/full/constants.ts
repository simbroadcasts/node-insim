import { ViewIdentifier } from '../../../src/packets';

export const APP_NAME = 'Node InSim Full';

export const VIEW_IDENTIFIERS: Record<ViewIdentifier, string> = {
  [ViewIdentifier.VIEW_FOLLOW]: 'follow',
  [ViewIdentifier.VIEW_HELI]: 'heli',
  [ViewIdentifier.VIEW_CAM]: 'external',
  [ViewIdentifier.VIEW_DRIVER]: 'in car',
  [ViewIdentifier.VIEW_CUSTOM]: 'custom',
};
