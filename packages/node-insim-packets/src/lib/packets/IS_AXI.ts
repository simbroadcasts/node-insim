import { Packet } from '../base/index.js';
import { byte, stringNull, word } from '../decorators.js';
import { PacketType } from '../enums/index.js';

/**
 * AutoX Info
 *
 * You can request information about the current layout with this {@link IS_TINY}:
 *
 * - ReqI: non-zero          (returned in the reply)
 * - SubT: {@link TINY_AXI}  (AutoX Info)
 *
 * The information will be sent back in this packet (also sent when a layout is loaded).
 */
export class IS_AXI extends Packet {
  @byte() readonly Size = 40;
  @byte() readonly Type = PacketType.ISP_AXI;

  /** 0 unless this is a reply to an {@link TINY_AXI} request */
  @byte() ReqI = 0;

  @byte() readonly Zero = 0;

  /** Autocross start position */
  @byte() AXStart = 0;

  /** Number of checkpoints */
  @byte() NumCP = 0;

  /** Number of objects */
  @word() NumO = 0;

  /** The name of the layout last loaded (if loaded locally) */
  @stringNull(32) LName = '';
}
