import { byte, string } from '../utils';
import { AbstractSendablePacket } from './AbstractSendablePacket';
import type { ButtonStyle, ButtonTextColour } from './enums';
import { PacketType } from './enums';
import type { PacketDataWithRequiredReqI } from './types';

/**
 * BuTtoN - button header - followed by 0 to 240 characters
 *
 * You can make up to 240 buttons appear on the host or guests (ID = 0 to 239).
 * You should set the {@link InSimFlags.ISF_LOCAL} flag (in {@link IS_ISI}) if
 * your program is not a host control system, to make sure your buttons do not
 * conflict with any buttons sent by the host.
 *
 * LFS can display normal buttons in these four screens:
 * - main entry screen
 * - race setup screen
 * - in game
 * - SHIFT+U mode
 *
 * The recommended area for most buttons is defined by:
 * - {@link IS_X_MIN}
 * - {@link IS_X_MAX}
 * - {@link IS_Y_MIN}
 * - {@link IS_Y_MAX}
 *
 * If you draw buttons in this area, the area will be kept clear to avoid
 * overlapping LFS buttons with your InSim program's buttons. Buttons outside
 * that area will not have a space kept clear. You can also make buttons visible
 * in all screens by setting the {@link Inst} property to {@link INST_ALWAYS_ON}.
 */
export class IS_BTN extends AbstractSendablePacket {
  public static readonly INST_ALWAYS_ON = 128;
  public static readonly IS_X_MIN = 0;
  public static readonly IS_X_MAX = 110;
  public static readonly IS_Y_MIN = 30;
  public static readonly IS_Y_MAX = 170;
  public static readonly MAX_CLICK_ID = 239;

  private static readonly FIXED_DATA_SIZE = 12;

  /** 12 + text size (a multiple of 4) */
  @byte() Size = IS_BTN.FIXED_DATA_SIZE;

  @byte() readonly Type = PacketType.ISP_BTN;

  /** Non-zero (returned in {@link IS_BTC} and {@link IS_BTT} packets) */
  @byte() ReqI = 1;

  /** Connection to display the button (0 = local / 255 = all) */
  @byte() UCID = 0;

  /**
   * Button ID (0 to 239)
   *
   * This value is returned in {@link IS_BTC} and {@link IS_BTT} packets.
   *
   * Host buttons and local buttons are stored separately, so there is no
   * chance of a conflict between a host control system and a local system
   * (although the buttons could overlap on screen).
   *
   * Programmers of local InSim programs may wish to consider using a
   * configurable button range and possibly screen position, in case their
   * users will use more than one local InSim program at once.
   * */
  @byte() ClickID = 0;

  /**
   * Mainly used internally by InSim but also provides some extra user flags
   *
   * NOTE: You should not use {@link INST_ALWAYS_ON} for most buttons.
   * This is a special flag for buttons that really must be on in all screens (including the garage and options screens). You will probably need to confine these buttons to the top or bottom edge of the screen, to avoid overwriting LFS buttons. Most buttons should be defined without this flag, and positioned in the recommended area so LFS can keep a space clear in the main screens.
   *
   * */
  @byte() Inst = 0;

  /** Button style flags */
  @byte() BStyle: ButtonStyle | ButtonTextColour = 0;

  /**
   * If set, the user can click this button to type in text.
   *
   * Lowest 7 bits are the maximum number of characters to type in (0 to 95)
   * The highest bit (128) can be set to initialise dialog with the button's text
   */
  @byte() TypeIn = 0;

  /** Left offset (0 to 200) */
  @byte() L = 0;

  /** Top offset (0 to 200) */
  @byte() T = 0;

  /** Width (0 to 200) */
  @byte() W = 0;

  /** Height (0 to 200) */
  @byte() H = 0;

  /** 0 to 240 characters of text */
  @string(0) Text = '';

  constructor(data?: IS_BTN_Data) {
    super();
    this.initialize(data);
  }

  pack(): Buffer {
    if (this.ReqI === 0) {
      throw new RangeError('IS_BTN - ReqI must be greater than 0');
    }

    if (this.ClickID > IS_BTN.MAX_CLICK_ID) {
      throw new RangeError(
        `IS_BTN - Invalid ClickID: ${this.ClickID} - must be less than or equal to ${IS_BTN.MAX_CLICK_ID}`,
      );
    }

    const multiple = 4;
    const length = this.Text.length;
    const textSize = Math.min(length + (multiple - (length % multiple)), 240);
    this.Size = IS_BTN.FIXED_DATA_SIZE + textSize;

    return super.pack({
      Text: `${textSize}s`,
    });
  }
}

export type IS_BTN_Data = PacketDataWithRequiredReqI<IS_BTN>;
