import { byte, char } from '../utils';
import { BasePacket } from './BasePacket';
import { PacketType } from './enums';

/**
 * InSim Multi
 *
 * LFS will send this packet when a host is started or joined.
 *
 * On ending or leaving a host, LFS will send this {@link IS_TINY}:
 *
 * - ReqI: 0
 * - SubT: {@link TINY_MPE} (MultiPlayerEnd)
 *
 * To request an {@link IS_ISM} packet at any time, send this {@link IS_TINY}:
 *
 * - ReqI: non-zero (returned in the reply)
 * - SubT: {@link TINY_ISM} (request an {@link IS_ISM})
 *
 * NOTE: If LFS is not in multiplayer mode, the host name in the ISM will be empty.
 */
export class IS_ISM extends BasePacket {
  @byte() readonly Size = 40;
  @byte() readonly Type = PacketType.ISP_ISM;

  /** Usually 0 / or if a reply: ReqI as received in the {@link TINY_ISM} */
  @byte() ReqI = 0;

  @byte() readonly Zero: 0 = 0;

  /** 0 = guest / 1 = host */
  @byte() Host: MultiplayerHostMode = 0;

  @byte() readonly Sp1: 0 = 0;
  @byte() readonly Sp2: 0 = 0;
  @byte() readonly Sp3: 0 = 0;

  /** The name of the host joined or started */
  @char(32) HName = '';
}

export enum MultiplayerHostMode {
  GUEST,
  HOST,
}
