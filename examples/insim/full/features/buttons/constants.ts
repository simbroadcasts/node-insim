import {
  SENDABLE_SMALL_TYPES,
  SENDABLE_TINY_TYPES,
} from '../../../../../src/packets';

export const BUTTON_HEIGHT = 4;

export const TINY_BUTTON_ID_OFFSET = 1;

export const SMALL_BUTTON_ID_OFFSET =
  TINY_BUTTON_ID_OFFSET + Math.max(...SENDABLE_TINY_TYPES) + 1;

export const SENDABLE_PACKETS_BUTTON_ID_OFFSET =
  SMALL_BUTTON_ID_OFFSET + Math.max(...SENDABLE_SMALL_TYPES) + 1;
