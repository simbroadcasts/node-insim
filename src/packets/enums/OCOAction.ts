export enum OCOAction {
  /** Reserved */
  OCO_ZERO,

  /** Give up control of all lights */
  OCO_LIGHTS_RESET = 4,

  /** Use Data byte to set the bulbs */
  OCO_LIGHTS_SET = 5,

  /** Give up control of the specified lights */
  OCO_LIGHTS_UNSET = 6,
}
