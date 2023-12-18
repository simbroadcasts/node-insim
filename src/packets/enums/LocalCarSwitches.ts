const LCS_SET_SIGNALS = 1;
const LCS_SET_FLASH = 2;
const LCS_SET_HEADLIGHTS = 4;
const LCS_SET_HORN = 8;
const LCS_SET_SIREN = 16;

export enum LocalCarSwitches {
  /**
   * Turn all signals off
   *
   * @deprecated Use {@link SMALL_LCL} with {@link LocalCarLights.SIGNALS_OFF}
   */
  SIGNALS_OFF = LCS_SET_SIGNALS,

  /**
   * Turn left signals on
   *
   * @deprecated Use {@link SMALL_LCL} with {@link LocalCarLights.SIGNALS_LEFT}
   */
  SIGNALS_LEFT = LCS_SET_SIGNALS + (1 << 8),

  /**
   * Turn right signals on
   *
   * @deprecated Use {@link SMALL_LCL} with {@link LocalCarLights.SIGNALS_RIGHT}
   */
  SIGNALS_RIGHT = LCS_SET_SIGNALS + (2 << 8),

  /**
   * Turn hazards on
   *
   * @deprecated Use {@link SMALL_LCL} with {@link LocalCarLights.SIGNALS_HAZARD}
   */
  SIGNALS_HAZARD = LCS_SET_SIGNALS + (3 << 8),

  /** Stop flashing lights */
  FLASH_OFF = LCS_SET_FLASH,

  /** Start flashing lights */
  FLASH_ON = LCS_SET_FLASH + (1 << 10),

  /**
   * Turn headlights off
   *
   * @deprecated Use {@link SMALL_LCL} with {@link LocalCarLights.LIGHTS_OFF}
   */
  HEADLIGHTS_OFF = LCS_SET_HEADLIGHTS,

  /**
   * Turn headlights on
   *
   * @deprecated Use {@link SMALL_LCL} with {@link LocalCarLights.LIGHTS_SIDE}, {@link LocalCarLights.LIGHTS_LOW} or {@link LocalCarLights.LIGHTS_HIGH}
   */
  HEADLIGHTS_ON = LCS_SET_HEADLIGHTS + (1 << 11),

  /** Turn horn off */
  HORN_OFF = LCS_SET_HORN,

  /** Turn on horn sound 1 */
  HORN_1 = LCS_SET_HORN + (1 << 16),

  /** Turn on horn sound 2 */
  HORN_2 = LCS_SET_HORN + (2 << 16),

  /** Turn on horn sound 3 */
  HORN_3 = LCS_SET_HORN + (3 << 16),

  /** Turn on horn sound 4 */
  HORN_4 = LCS_SET_HORN + (4 << 16),

  /** Turn on horn sound 5 */
  HORN_5 = LCS_SET_HORN + (5 << 16),

  /** Turn siren off */
  SIREN_OFF = LCS_SET_SIREN,

  /** Turn fast siren on */
  SIREN_FAST = LCS_SET_SIREN + (1 << 20),

  /** Turn slow siren on */
  SIREN_SLOW = LCS_SET_SIREN + (2 << 20),
}
