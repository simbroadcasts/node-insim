export enum OutGaugeFlags {
  /** Shift key is pressed */
  OG_SHIFT = 1,

  /** Ctrl key is pressed */
  OG_CTRL = 2,

  /** Show turbo gauge */
  OG_TURBO = 8192,

  /** If not set - user prefers MILES */
  OG_KM = 16384,

  /** If not set - user prefers PSI */
  OG_BAR = 32768,
}
