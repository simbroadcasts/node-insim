import { byte } from '../decorators';
import { SendablePacket } from './base';
import { PacketType } from './enums';
import { IS_BTN } from './IS_BTN';
import type { PacketData } from './types';

/**
 * Button FunctioN - delete buttons / receive button requests
 *
 * NOTE: {@link BFN_REQUEST} allows the user to bring up buttons with SHIFT+B or SHIFT+I
 *
 * - SHIFT+I clears all host buttons if any - or sends a {@link BFN_REQUEST} to host instances
 * - SHIFT+B is the same but for local buttons and local instances
 */
export class IS_BFN extends SendablePacket {
  @byte() readonly Size = 8;
  @byte() readonly Type = PacketType.ISP_BFN;
  @byte() readonly ReqI = 0;

  /** Subtype */
  @byte() readonly SubT: ButtonFunction = 0;

  /** Connection to send to or received from (0 = local / 255 = all) */
  @byte() UCID = 0;

  /** If SubT is {@link BFN_DEL_BTN}: ID of single button to delete or first button in range */
  @byte() ClickID = 0;

  /** If SubT is {@link BFN_DEL_BTN}: ID of last button in range (if greater than ClickID) */
  @byte() ClickMax = 0;

  /** Used internally by InSim */
  @byte() Inst = 0;

  constructor(data?: IS_BFN_Data) {
    super();
    this.initialize(data);
  }

  pack() {
    if (this.ClickID > IS_BTN.MAX_CLICK_ID) {
      throw new RangeError(
        `IS_BFN - Invalid ClickID: ${this.ClickID} - must be less than or equal to ${IS_BTN.MAX_CLICK_ID}`,
      );
    }

    if (this.ClickMax > IS_BTN.MAX_CLICK_ID) {
      throw new RangeError(
        `IS_BFN - Invalid ClickMax: ${this.ClickMax} - must be less than or equal to ${IS_BTN.MAX_CLICK_ID}`,
      );
    }

    return super.pack();
  }
}

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

export type IS_BFN_Data = PacketData<IS_BFN>;
