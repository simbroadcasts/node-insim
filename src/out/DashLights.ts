export enum DashLights {
  /** Shift light */
  DL_SHIFT = 1,

  /** High beam */
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

  /** Engine damage */
  DL_ENGINE = 2048,

  /** Rear fog light */
  DL_FOG_REAR = 4096,

  /** Front fog light */
  DL_FOG_FRONT = 8192,

  /** Low beam */
  DL_LOWBEAM = 16384,

  /** Low fuel warning light */
  DL_FUELWARN = 32768,

  /** Sidelights */
  DL_SIDELIGHTS = 65536,

  /** Neutral */
  DL_NEUTRAL = 131072,
}
