export enum ConfirmationFlags {
  /** Mentioned */
  CONF_MENTIONED = 1,

  /** Confirmed */
  CONF_CONFIRMED = 2,

  /** Has drive-through penalty */
  CONF_PENALTY_DT = 4,

  /** Has stop & go penalty */
  CONF_PENALTY_SG = 8,

  /** Has 30 second time penalty */
  CONF_PENALTY_30 = 16,

  /** Has 45 second time penalty */
  CONF_PENALTY_45 = 32,

  /** Did not complete a required pit stop */
  CONF_DID_NOT_PIT = 64,
}
