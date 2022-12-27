import { byte, char } from '../utils';
import { AbstractPacket } from './AbstractPacket';
import { PacketType } from './enums';

/**
 * Conn Player Rename
 */
export class IS_CPR extends AbstractPacket {
  @byte() readonly Size = 36;
  @byte() readonly Type = PacketType.ISP_CPR;
  @byte() readonly ReqI: 0 = 0;

  /** Unique id of the connection */
  @byte() UCID = 0;

  /** New name */
  @char(24) PName = '';

  /** Number plate - NO ZERO AT END! */
  @char(8) Plate = '';
}
