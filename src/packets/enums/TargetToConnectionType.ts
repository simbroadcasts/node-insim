export enum TargetToConnectionType {
  /** Not used */
  TTC_NONE,

  /** Info request: send {@link IS_AXM} for a layout editor selection */
  TTC_SEL,

  /** Info request: send {@link IS_AXM} every time the selection changes */
  TTC_SEL_START,

  /** Instruction: switch off {@link IS_AXM} requested by {@link TTC_SEL_START} */
  TTC_SEL_STOP,
}
