import { BasePacket } from './BasePacket';
import { PacketType } from './packetTypes';

/**
 * Version request
 *
 * It is advisable to request version information as soon as you have connected, to
 * avoid problems when connecting to a host with a later or earlier version. You will
 * be sent a version packet on connection if you set ReqI in the {@link IS_ISI} packet.
 */
export class IS_VER extends BasePacket implements IS_VER_Data {
  readonly _format = '<BBBB8s6sBB';

  readonly Size = 20;
  readonly Type = PacketType.ISP_VER;

  /** ReqI as received in the request packet */
  ReqI = 0;

  readonly Zero = 0;

  /** LFS version, e.g. 0.3G */
  Version = '';

  /** Product: DEMO / S1 / S2 / S3 */
  Product = '';

  /** InSim version */
  InSimVer = 0;

  readonly Spare = 0;

  constructor(data?: Partial<IS_VER_Data>) {
    super();
    this.populateData(data);
  }
}

export type IS_VER_Data = {
  /** ReqI as received in the request packet */
  ReqI: number;

  /** LFS version, e.g. 0.3G */
  Version: string;

  /** Product: DEMO / S1 / S2 / S3 */
  Product: string;

  /** InSim version */
  InSimVer: number;

  Spare: number;
};
