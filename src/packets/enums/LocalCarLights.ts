const LCL_SET_SIGNALS = 1;
const LCL_SET_LIGHTS = 4;
const LCL_SET_FOG_REAR = 16;
const LCL_SET_FOG_FRONT = 32;
const LCL_SET_EXTRA = 64;

export enum LocalCarLights {
  /** Turn all signals off */
  SIGNALS_OFF = LCL_SET_SIGNALS,

  /** Turn left signals on */
  SIGNALS_LEFT = LCL_SET_SIGNALS + (1 << 16),

  /** Turn right signals on */
  SIGNALS_RIGHT = LCL_SET_SIGNALS + (2 << 16),

  /** Turn hazards on */
  SIGNALS_HAZARD = LCL_SET_SIGNALS + (3 << 16),

  /** Turn lights off */
  LIGHTS_OFF = LCL_SET_LIGHTS,

  /** Turn side lights on */
  LIGHTS_SIDE = LCL_SET_LIGHTS + (1 << 18),

  /** Turn low beam on */
  LIGHTS_LOW = LCL_SET_LIGHTS + (2 << 18),

  /** Turn high beam on */
  LIGHTS_HIGH = LCL_SET_LIGHTS + (3 << 18),

  /** Turn rear fog light off */
  FOG_REAR_OFF = LCL_SET_FOG_REAR,

  /** Turn rear fog light on */
  FOG_REAR = LCL_SET_FOG_REAR + (1 << 20),

  /** Turn front fog light off */
  FOG_FRONT_OFF = LCL_SET_FOG_FRONT,

  /** Turn front fog light on */
  FOG_FRONT = LCL_SET_FOG_FRONT + (1 << 21),

  /** Turn extra light off */
  EXTRA_OFF = LCL_SET_EXTRA,

  /** Turn extra light on */
  EXTRA = LCL_SET_EXTRA + (1 << 22),
}
