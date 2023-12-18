export enum SmallType {
  /** Not used */
  SMALL_NONE,

  /** Instruction: start sending positions */
  SMALL_SSP,

  /** Instruction: start sending gauges */
  SMALL_SSG,

  /** Report: vote action */
  SMALL_VTA,

  /** Instruction: time stop */
  SMALL_TMS,

  /** Instruction: time step */
  SMALL_STP,

  /** Info: race time packet (reply to {@link TINY_GTH}) */
  SMALL_RTP,

  /** Instruction: set node lap interval */
  SMALL_NLI,

  /** Both ways: set or get allowed cars ({@link TINY_ALC}) */
  SMALL_ALC,

  /** Instruction: set local car switches (flash, horn, siren) */
  SMALL_LCS,

  /** Instruction: set local car lights */
  SMALL_LCL,
}
