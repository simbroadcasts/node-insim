import { byte } from '../utils';
import { AbstractSendablePacket } from './AbstractSendablePacket';
import type { ButtonFunction } from './enums';
import { PacketType } from './enums';
import type { PacketData } from './types';

/**
 * Button FunctioN - delete buttons / receive button requests
 *
 * NOTE: {@link BFN_REQUEST} allows the user to bring up buttons with SHIFT+B or SHIFT+I
 *
 * - SHIFT+I clears all host buttons if any - or sends a {@link BFN_REQUEST} to host instances
 * - SHIFT+B is the same but for local buttons and local instances
 */
export class IS_BFN extends AbstractSendablePacket {
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
}

export type IS_BFN_Data = PacketData<IS_BFN>;
