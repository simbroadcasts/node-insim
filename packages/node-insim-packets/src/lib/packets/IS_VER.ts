import { Packet } from '../base/index.js';
import { byte, stringNull } from '../decorators.js';
import { PacketType } from '../enums/index.js';

/**
 * Version request
 *
 * It is advisable to request version information as soon as you have connected, to
 * avoid problems when connecting to a host with a later or earlier version. You will
 * be sent a version packet on connection if you set ReqI in the {@link IS_ISI} packet.
 */
export class IS_VER extends Packet {
  @byte() readonly Size = 20;
  @byte() readonly Type = PacketType.ISP_VER;

  /** ReqI as received in the request packet */
  @byte() ReqI = 0;

  @byte() readonly Zero = 0;

  /** LFS version, e.g. 0.3G */
  @stringNull(8) Version = '';

  /** Product: DEMO / S1 / S2 / S3 */
  @stringNull(6) Product = '';

  /** InSim version */
  @byte() InSimVer = 0;

  @byte() private readonly Spare = 0;
}
