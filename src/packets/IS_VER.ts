import { byte, string } from '../utils';
import { AbstractPacket } from './AbstractPacket';
import { PacketType } from './enums';

/**
 * Version request
 *
 * It is advisable to request version information as soon as you have connected, to
 * avoid problems when connecting to a host with a later or earlier version. You will
 * be sent a version packet on connection if you set ReqI in the {@link IS_ISI} packet.
 */
export class IS_VER extends AbstractPacket {
  @byte() readonly Size = 20;
  @byte() readonly Type = PacketType.ISP_VER;

  /** ReqI as received in the request packet */
  @byte() ReqI = 0;

  @byte() readonly Zero = 0;

  /** LFS version, e.g. 0.3G */
  @string(8) Version = '';

  /** Product: DEMO / S1 / S2 / S3 */
  @string(6) Product = '';

  /** InSim version */
  @byte() InSimVer = 0;

  @byte() readonly Spare = 0;
}
