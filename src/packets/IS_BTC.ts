import { byte } from '../utils';
import { AbstractPacket } from './AbstractPacket';
import type { ButtonClickFlags } from './enums';
import { PacketType } from './enums';

/**
 * BuTton Click - sent back when user clicks a button
 */
export class IS_BTC extends AbstractPacket {
  @byte() readonly Size = 8;
  @byte() readonly Type = PacketType.ISP_BTC;

  /** ReqI as received in the {@link IS_BTN} */
  @byte() ReqI = 0;

  /** Connection that clicked the button (zero if local) */
  @byte() UCID = 0;

  /** Button identifier originally sent in {@link IS_BTN} */
  @byte() ClickID = 0;

  /** Used internally by InSim */
  @byte() Inst = 0;

  /** Button click flags */
  @byte() CFlags: ButtonClickFlags = 0;

  @byte() readonly Sp3: 0 = 0;
}
