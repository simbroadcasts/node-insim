export enum DashLights {
  /** Shift light */
  DL_SHIFT = 0,

  /** Full beam */
  DL_FULLBEAM = 1,

  /** Handbrake */
  DL_HANDBRAKE = 2,

  /** Pit speed limiter */
  DL_PITSPEED = 4,

  /** TC active or switched off */
  DL_TC = 8,

  /** Left turn signal */
  DL_SIGNAL_L = 16,

  /** Right turn signal */
  DL_SIGNAL_R = 32,

  /** Shared turn signal */
  DL_SIGNAL_ANY = 64,

  /** Oil pressure warning */
  DL_OILWARN = 128,

  /** Battery warning */
  DL_BATTERY = 256,

  /** ABS active or switched off */
  DL_ABS = 512,

  DL_SPARE = 1024,

  DL_NUM = 2048,
}
