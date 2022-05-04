import { BasePacket } from './BasePacket';
import { byte } from './decorators';
import { PacketType } from './packetTypes';

/**
 * BuTton Click - sent back when user clicks a button
 */
export class IS_BTC extends BasePacket {
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

  constructor(data?: Buffer) {
    super();
    this.initialize(data);
  }
}

export enum ButtonClickFlags {
  /** Left click */
  ISB_LMB = 1,

  /** Right click */
  ISB_RMB = 2,

  /** Ctrl + click */
  ISB_CTRL = 4,

  /** Shift + click */
  ISB_SHIFT = 8,
}
