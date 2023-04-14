import { byte, string, stringNull } from '../decorators';
import { Packet } from './base';
import { PacketType } from './enums';

/**
 * Conn Player Rename
 */
export class IS_CPR extends Packet {
  @byte() readonly Size = 36;
  @byte() readonly Type = PacketType.ISP_CPR;
  @byte() readonly ReqI = 0;

  /** Unique id of the connection */
  @byte() UCID = 0;

  /** New name */
  @stringNull(24) PName = '';

  /** Number plate - NO ZERO AT END! */
  @string(8) Plate = '';
}
