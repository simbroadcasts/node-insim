import { byte } from '../utils';
import { AbstractPacket } from './AbstractPacket';
import type { VoteAction } from './enums';
import { PacketType } from './enums';

/**
 * VoTe Notify
 *
 * LFS notifies the external program of any votes to restart or qualify.
 */
export class IS_VTN extends AbstractPacket {
  @byte() readonly Size = 8;
  @byte() readonly Type = PacketType.ISP_VTN;
  @byte() readonly ReqI = 0;
  @byte() readonly Zero = 0;

  /** Connection's unique id */
  @byte() UCID = 0;

  /** Vote action */
  @byte() Action: VoteAction = 0;

  @byte() readonly Spare2 = 0;
  @byte() readonly Spare3 = 0;
}
