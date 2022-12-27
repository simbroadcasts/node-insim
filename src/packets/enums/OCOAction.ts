export enum OCOAction {
  OCO_ZERO,
  OCO_1,
  OCO_2,
  OCO_3,

  /** Give up control of all lights */
  OCO_LIGHTS_RESET,

  /** Use Data byte to set the bulbs */
  OCO_LIGHTS_SET,

  /** Give up control of the specified lights */
  OCO_LIGHTS_UNSET,

  OCO_NUM,
}
