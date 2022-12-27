export enum PenaltyReason {
  /** Unknown or cleared penalty */
  PENR_UNKNOWN,

  /** Penalty given by admin */
  PENR_ADMIN,

  /** Wrong way driving */
  PENR_WRONG_WAY,

  /** Starting before green light */
  PENR_FALSE_START,

  /** Speeding in pit lane */
  PENR_SPEEDING,

  /** Stop-go pit stop too short */
  PENR_STOP_SHORT,

  /** Compulsory stop is too late */
  PENR_STOP_LATE,
}
