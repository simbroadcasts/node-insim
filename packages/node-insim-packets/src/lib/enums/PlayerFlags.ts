export enum PlayerFlags {
  /** Driver is on the left side */
  PIF_LEFTSIDE = 1,

  /** Automatic gear shift */
  PIF_AUTOGEARS = 8,

  /** Shifter */
  PIF_SHIFTER = 16,

  /** Inertia steer */
  PIF_INERTIA_STEER = 32,

  /** Brake help */
  PIF_HELP_B = 64,

  /** Axis clutch */
  PIF_AXIS_CLUTCH = 128,

  /** In pits */
  PIF_INPITS = 256,

  /** Auto clutch */
  PIF_AUTOCLUTCH = 512,

  /** Mouse steering */
  PIF_MOUSE = 1024,

  /** Keyboard steering (no help) */
  PIF_KB_NO_HELP = 2048,

  /** Keyboard steering (stabilized) */
  PIF_KB_STABILISED = 4096,

  /** Custom view */
  PIF_CUSTOM_VIEW = 8192,
}
