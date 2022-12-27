export enum RaceFlags {
  /** Vote kick/ban allowed */
  HOSTF_CAN_VOTE = 1,

  /** Guest are allowed to select tracks */
  HOSTF_CAN_SELECT = 2,

  /** Mid-race join allowed */
  HOSTF_MID_RACE = 32,

  /** Pit stop required */
  HOSTF_MUST_PIT = 64,

  /** Car reset allowed */
  HOSTF_CAN_RESET = 128,

  /** Forced cockpit view */
  HOSTF_FCV = 256,

  /** Cruise mode (wrong way allowed) */
  HOSTF_CRUISE = 512,
}
