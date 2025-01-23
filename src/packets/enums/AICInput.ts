export enum AICInput {
  /** Steering: 32768 is centre */
  CS_MSX,

  /** Throttle */
  CS_THROTTLE,

  /** Brake */
  CS_BRAKE,

  /** Shift up (set to 1 for a short time then set back to 0) */
  CS_CHUP,

  /** Shift down */
  CS_CHDN,

  /** Ignition: set to 1 (auto switch off) */
  CS_IGNITION,

  /** Extra light */
  CS_EXTRALIGHT,

  /** Headlights: 1: off / 2: side / 3: low / 4: high */
  CS_HEADLIGHTS,

  /** Siren */
  CS_SIREN,

  /** Horn */
  CS_HORN,

  /** Flash */
  CS_FLASH,

  /** Clutch */
  CS_CLUTCH,

  /** Handbrake */
  CS_HANDBRAKE,

  /** 1: cancel / 2: left / 3: right / 4: hazard */
  CS_INDICATORS,

  /** Gear for shifter (leave at 255 for sequential control) */
  CS_GEAR,

  /** Look: 0: none / 4: left / 5: left+ / 6: right / 7: right+ */
  CS_LOOK,

  /** Pit speed limiter */
  CS_PITSPEED,

  /** Traction control disable */
  CS_TCDISABLE,

  /** Rear fog light */
  CS_FOGREAR,

  /** Front fog light */
  CS_FOGFRONT,

  CS_NUM,

  /** Reset all inputs */
  CS_RESET_ALL,

  /** Stop controlling the AI car */
  CS_STOP_CONTROL,
}
