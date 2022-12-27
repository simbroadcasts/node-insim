export enum PenaltyReason {
  /** unknown or cleared penalty */
  PENR_UNKNOWN,

  /** penalty given by admin */
  PENR_ADMIN,

  /** wrong way driving */
  PENR_WRONG_WAY,

  /** starting before green light */
  PENR_FALSE_START,

  /** speeding in pit lane */
  PENR_SPEEDING,

  /** stop-go pit stop too short */
  PENR_STOP_SHORT,

  /** compulsory stop is too late */
  PENR_STOP_LATE,

  PENR_NUM,
}
