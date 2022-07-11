import { byte, char } from '../utils';
import { BasePacket } from './BasePacket';
import { PacketType } from './enums';

/**
 * Conn Player Rename
 */
export class IS_CPR extends BasePacket {
  @byte() readonly Size = 36;
  @byte() readonly Type = PacketType.ISP_CPR;

  /** 0 */
  @byte() readonly ReqI: 0 = 0;

  /** Unique id of the connection */
  @byte() UCID = 0;

  /** New name */
  @char(24) PName = '';

  /** Number plate - NO ZERO AT END! */
  @char(8) Plate = '';
}