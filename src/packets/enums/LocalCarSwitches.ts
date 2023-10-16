export enum LocalCarSwitches {
  /** Set signal lights */
  LCS_SET_SIGNALS = 1,

  /** Set flash lights */
  LCS_SET_FLASH = 2,

  /** Set headlights */
  LCS_SET_HEADLIGHTS = 4,

  /** Set horn type */
  LCS_SET_HORN = 8,

  /** Set siren */
  LCS_SET_SIREN = 16,

  /** Turn all signals off */
  LCS_SIGNALS_OFF = LCS_SET_SIGNALS,

  /** Turn left signals on */
  LCS_SIGNALS_LEFT = LCS_SET_SIGNALS + 256,

  /** Turn right signals on */
  LCS_SIGNALS_RIGHT = LCS_SET_SIGNALS + 512,

  /** Turn hazards on */
  LCS_SIGNALS_HAZARD = LCS_SET_SIGNALS + 512 + 256,

  /** Turn flash lights off */
  LCS_FLASH_OFF = LCS_SET_FLASH,

  /** Turn flash lights on */
  LCS_FLASH_ON = LCS_SET_FLASH + 1024,

  /** Turn headlights off */
  LCS_HEADLIGHTS_OFF = LCS_SET_HEADLIGHTS,

  /** Turn headlights on */
  LCS_HEADLIGHTS_ON = LCS_SET_HEADLIGHTS + 2048,

  /** Turn horn off */
  LCS_HORN_OFF = LCS_SET_HORN,

  /** Turn on horn sound 1 */
  LCS_HORN_1 = LCS_SET_HORN + 65536,

  /** Turn on horn sound 2 */
  LCS_HORN_2 = LCS_SET_HORN + 131072,

  /** Turn on horn sound 3 */
  LCS_HORN_3 = LCS_SET_HORN + 131072 + 65536,

  /** Turn on horn sound 4 */
  LCS_HORN_4 = LCS_SET_HORN + 262144,

  /** Turn on horn sound 5 */
  LCS_HORN_5 = LCS_SET_HORN + 2097152 + 65536,

  /** Turn siren off */
  LCS_SIREN_OFF = LCS_SET_SIREN,

  /** Turn fast siren on */
  LCS_SIREN_FAST = LCS_SET_SIREN + 1048576,

  /** Turn slow siren on */
  LCS_SIREN_SLOW = LCS_SET_SIREN + 2097152,
}
