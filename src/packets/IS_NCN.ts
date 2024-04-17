import { byte, stringNull } from '../decorators';
import { Packet } from './base';
import type { ConnectionFlags } from './enums';
import { PacketType } from './enums';

/**
 * New ConN
 */
export class IS_NCN extends Packet {
  @byte() readonly Size = 56;
  @byte() readonly Type = PacketType.ISP_NCN;

  /** 0 unless this is a reply to a {@link TINY_NCN} */
  @byte() ReqI = 0;

  /** New connection's unique id (0 = host) */
  @byte() UCID = 0;

  /** Username */
  @stringNull(24) UName = '';

  /** Nickname */
  @stringNull(24) PName = '';

  /** 1 if admin */
  @byte() Admin = 0;

  /** Number of connections including host */
  @byte() Total = 0;

  /** Bit 2: remote */
  @byte() Flags: ConnectionFlags | 0 = 0;

  @byte() private readonly Sp3 = 0;
}
