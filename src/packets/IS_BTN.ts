import { BaseSendablePacket } from './BaseSendablePacket';
import { byte, char } from './decorators';
import { PacketType } from './packetTypes';

/**
 * BuTtoN - button header - followed by 0 to 240 characters
 */
export class IS_BTN extends BaseSendablePacket implements IS_BTN_Data {
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
   * Host buttons and local buttons are stored separately, so there is no chance of a conflict between a host control system and a local system (although the buttons could overlap on screen).
   *
   * Programmers of local InSim programs may wish to consider using a configurable button range and possibly screen position, in case their users will use more than one local InSim program at once.
   * */
  @byte() ClickID = 0;

  /**
   * Mainly used internally by InSim but also provides some extra user flags
   *
   * NOTE: You should not use {@link ButtonInstFlags.INST_ALWAYS_ON} for most buttons.
   * This is a special flag for buttons that really must be on in all screens (including the garage and options screens). You will probably need to confine these buttons to the top or bottom edge of the screen, to avoid overwriting LFS buttons. Most buttons should be defined without this flag, and positioned in the recommended area so LFS can keep a space clear in the main screens.
   *
   * */
  @byte() Inst: ButtonInstFlags = 0;

  /** Button style flags */
  @byte() BStyle: ButtonStyle = 0;

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
  @char(0) Text = '';

  constructor(
    data?:
      | (Partial<Omit<IS_BTN_Data, 'ReqI'>> & Pick<IS_BTN_Data, 'ReqI'>)
      | Buffer,
  ) {
    super();
    this.initialize(data);
  }

  pack(): Buffer {
    // TODO: Convert to LFS encoding
    // TODO: Support text input caption

    const multiple = 4;
    const length = this.Text.length;
    const textSize = Math.min(length + (multiple - (length % multiple)), 240);
    this.Size = IS_BTN.FIXED_DATA_SIZE + textSize;

    if (length === 0) {
      return super.pack({
        Text: `${multiple}s`,
      });
    }

    return super.pack({
      Text: `${textSize}s`,
    });
  }
}

export type IS_BTN_Data = {
  /** Non-zero (returned in {@link IS_BTC} and {@link IS_BTT} packets) */
  ReqI: number;

  /** Connection to display the button (0 = local / 255 = all) */
  UCID: number;

  /**
   * Button ID (0 to 239)
   *
   * This value is returned in {@link IS_BTC} and {@link IS_BTT} packets.
   *
   * Host buttons and local buttons are stored separately, so there is no chance of a conflict between a host control system and a local system (although the buttons could overlap on screen).
   *
   * Programmers of local InSim programs may wish to consider using a configurable button range and possibly screen position, in case their users will use more than one local InSim program at once.
   * */
  ClickID: number;

  /**
   * Mainly used internally by InSim but also provides some extra user flags
   *
   * NOTE: You should not use {@link ButtonInstFlags.INST_ALWAYS_ON} for most buttons.
   * This is a special flag for buttons that really must be on in all screens (including the garage and options screens). You will probably need to confine these buttons to the top or bottom edge of the screen, to avoid overwriting LFS buttons. Most buttons should be defined without this flag, and positioned in the recommended area so LFS can keep a space clear in the main screens.
   *
   * */
  Inst: ButtonInstFlags;

  /** Button style flags */
  BStyle: ButtonStyle | ButtonTextColour;

  /**
   * If set, the user can click this button to type in text.
   *
   * Lowest 7 bits are the maximum number of characters to type in (0 to 95)
   * The highest bit (128) can be set to initialise dialog with the button's text
   */
  TypeIn: number;

  /** Left offset (0 to 200) */
  L: number;

  /** Top offset (0 to 200) */
  T: number;

  /** Width (0 to 200) */
  W: number;

  /** Height (0 to 200) */
  H: number;

  /** 0 to 240 characters of text */
  Text: string;
};

export enum ButtonInstFlags {
  /** If this bit is set the button is visible in all screens */
  INST_ALWAYS_ON = 128,
}

export enum ButtonTextColour {
  LightGrey,
  TitleColour,
  UnselectedText,
  SelectedText,
  Ok,
  Cancel,
  TextString,
  Unavailable,
}

export enum ButtonStyle {
  ISB_C1 = 1,
  ISB_C2 = 2,
  ISB_C4 = 4,

  /** Click this button to send {@link IS_BTC} */
  ISB_CLICK = 8,

  /** Light button */
  ISB_LIGHT = 16,

  /** Dark button */
  ISB_DARK = 32,

  /** Align text to left */
  ISB_LEFT = 64,

  /** Align text to right */
  ISB_RIGHT = 128,
}
