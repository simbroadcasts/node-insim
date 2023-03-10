import { byte, unsigned } from '../utils';
import { Packet } from './base';
import type { Language } from './enums';
import { PacketType } from './enums';

/**
 * New Conn Info - sent on host only if an admin password has been set
 */
export class IS_NCI extends Packet {
  @byte() readonly Size = 16;
  @byte() readonly Type = PacketType.ISP_NCI;

  /** 0 unless this is a reply to a {@link TINY_NCI} request */
  @byte() ReqI = 0;

  /** Connection's unique id (0 = host) */
  @byte() UCID = 0;

  /** Languages */
  @byte() Language: Language = 0;

  @byte() private readonly Sp1 = 0;
  @byte() private readonly Sp2 = 0;
  @byte() private readonly Sp3 = 0;

  /** LFS UserID */
  @unsigned() UserID = 0;

  /** IP address formatted as 255.255.255.255 */
  @unsigned() IPAddress = '';

  unpack(buffer: Uint8Array): this {
    super.unpack(buffer);

    this.IPAddress = buffer.slice(12, 16).join('.');

    return this;
  }
}
