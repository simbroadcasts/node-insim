import { SENDABLE_TINY_TYPES } from '../../../src/packets';

export const APP_NAME = 'Node InSim Full';

export const TINY_BUTTON_CLICK_ID_OFFSET = 70;

export const SMALL_BUTTON_CLICK_ID_OFFSET =
  TINY_BUTTON_CLICK_ID_OFFSET + Math.max(...SENDABLE_TINY_TYPES) + 1;
