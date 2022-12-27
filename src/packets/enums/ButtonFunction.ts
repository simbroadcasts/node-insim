export enum ButtonFunction {
  /** Instruction: delete one button or range of buttons (must set ClickID) */
  BFN_DEL_BTN,

  /** Instruction: clear all buttons made by this insim instance */
  BFN_CLEAR,

  /** Info: user cleared this insim instance's buttons */
  BFN_USER_CLEAR,

  /** User request: SHIFT+B or SHIFT+I - request for buttons */
  BFN_REQUEST,
}
