import { byte, carName } from '../utils';
import { AbstractPacket } from './base';
import { PacketType } from './enums';

/**
 * SeLected Car - sent when a connection selects a car (empty if no car)
 *
 * NOTE: If a new guest joins and does have a car selected then an {@link IS_SLC} will
 * be sent.
 */
export class IS_SLC extends AbstractPacket {
  @byte() readonly Size = 8;
  @byte() readonly Type = PacketType.ISP_SLC;

  /** 0 unless this is a reply to a {@link TINY_SLC} request */
  @byte() ReqI = 0;

  /** Connection's unique id (0 = host) */
  @byte() UCID = 0;

  /**
   * Car name
   *
   * The value can be one of these:
   * - a 3-character abbreviation of an official LFS car (e.g. XRT)
   * - a hexadecimal string representation of a car mod's SkinID (e.g. 5882E6)
   **/
  @carName() CName = '';
}
