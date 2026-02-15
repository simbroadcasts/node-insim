import { byte } from '../decorators';
import { Packet } from './base';
import { PacketType } from './enums';

/**
 * VoTe Notify
 *
 * LFS notifies the external program of any votes to restart or qualify.
 */
export class IS_VTN extends Packet {
  @byte() readonly Size = 8;
  @byte() readonly Type = PacketType.ISP_VTN;
  @byte() readonly ReqI = 0;
  @byte() readonly Zero = 0;

  /** Connection's unique id */
  @byte() UCID = 0;

  /** Vote action */
  @byte() Action: VoteAction = 0;

  @byte() private readonly Spare2 = 0;
  @byte() private readonly Spare3 = 0;
}

export enum VoteAction {
  /** No vote */
  VOTE_NONE,

  /** end race */
  VOTE_END,

  /** Restart */
  VOTE_RESTART,

  /** Qualify */
  VOTE_QUALIFY,
}
