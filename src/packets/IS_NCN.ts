import { byte, char } from '../utils';
import { AbstractPacket } from './AbstractPacket';
import type { ConnectionFlags } from './enums';
import { PacketType } from './enums';

/**
 * New ConN
 */
export class IS_NCN extends AbstractPacket {
  @byte() readonly Size = 56;
  @byte() readonly Type = PacketType.ISP_NCN;

  /** 0 unless this is a reply to a {@link TINY_NCN} */
  @byte() ReqI = 0;

  /** New connection's unique id (0 = host) */
  @byte() UCID = 0;

  /** Username */
  @char(24) UName = '';

  /** Nickname */
  @char(24) PName = '';

  /** 1 if admin */
  @byte() Admin = 0;

  /** Number of connections including host */
  @byte() Total = 0;

  /** Bit 2: remote */
  @byte() Flags: ConnectionFlags = 0;

  @byte() readonly Sp3 = 0;
}
