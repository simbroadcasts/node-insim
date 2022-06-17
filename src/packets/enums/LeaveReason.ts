export enum LeaveReason {
  /** None */
  LEAVR_DISCO,

  /** Timed out */
  LEAVR_TIMEOUT,

  /** Lost connection */
  LEAVR_LOSTCONN,

  /** Kicked */
  LEAVR_KICKED,

  /** Banned */
  LEAVR_BANNED,

  /** Security */
  LEAVR_SECURITY,

  /** Cheat protection warning */
  LEAVR_CPW,

  /** Out of sync with host */
  LEAVR_OOS,

  /** Join OOS (initial sync failed) */
  LEAVR_JOOS,

  /** Invalid packet */
  LEAVR_HACK,

  LEAVR_NUM,
}
