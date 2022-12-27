export enum JRRAction {
  /** Reject new player */
  JRR_REJECT = 0,

  /** Allow new player */
  JRR_SPAWN = 1,

  /** Reset player's car */
  JRR_RESET = 4,

  /** Reset player's car without repairing damage */
  JRR_RESET_NO_REPAIR = 5,
}
