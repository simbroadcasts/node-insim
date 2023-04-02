export enum DashLights {
  /** Shift light */
  DL_SHIFT = 1,

  /** Full beam */
  DL_FULLBEAM = 2,

  /** Handbrake */
  DL_HANDBRAKE = 4,

  /** Pit speed limiter */
  DL_PITSPEED = 8,

  /** TC active or switched off */
  DL_TC = 16,

  /** Left turn signal */
  DL_SIGNAL_L = 32,

  /** Right turn signal */
  DL_SIGNAL_R = 64,

  /** Shared turn signal */
  DL_SIGNAL_ANY = 128,

  /** Oil pressure warning */
  DL_OILWARN = 256,

  /** Battery warning */
  DL_BATTERY = 512,

  /** ABS active or switched off */
  DL_ABS = 1024,

  DL_SPARE = 2048,

  DL_NUM = 4096,
}
