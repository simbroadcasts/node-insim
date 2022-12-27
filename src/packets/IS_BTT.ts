import { byte, string } from '../utils';
import { Packet } from './base';
import { PacketType } from './enums';

/**
 * BuTton Type - sent back when user types into a text entry button
 *
 * If the {@link IS_BTN.TypeIn} byte is set in {@link IS_BTN} the user can type text into the button
 * In that case no {@link IS_BTC} is sent - an {@link IS_BTT} is sent when the user presses ENTER
 */
export class IS_BTT extends Packet {
  @byte() readonly Size = 104;
  @byte() readonly Type = PacketType.ISP_BTT;

  /** ReqI as received in the {@link IS_BTN} */
  @byte() ReqI = 0;

  /** Connection that typed into the button (zero if local) */
  @byte() UCID = 0;

  /** Button identifier originally sent in {@link IS_BTN} */
  @byte() ClickID = 0;

  /** Used internally by InSim */
  @byte() Inst = 0;

  /** From original button specification */
  @byte() TypeIn = 0;

  @byte() private readonly Sp3 = 0;

  /** Typed text, zero to {@link IS_BTN.TypeIn} specified in {@link IS_BTN} */
  @string(96) Text = '';
}
