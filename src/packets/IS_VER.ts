import { BasePacket } from './BasePacket';
import { byte, char } from './decorators';
import { PacketType } from './packetTypes';

/**
 * Version request
 *
 * It is advisable to request version information as soon as you have connected, to
 * avoid problems when connecting to a host with a later or earlier version. You will
 * be sent a version packet on connection if you set ReqI in the {@link IS_ISI} packet.
 */
export class IS_VER extends BasePacket implements IS_VER_Data {
  @byte() readonly Size = 20;
  @byte() readonly Type = PacketType.ISP_VER;

  /** ReqI as received in the request packet */
  @byte() ReqI = 0;

  @byte() readonly Zero = 0;

  /** LFS version, e.g. 0.3G */
  @char(8) Version = '';

  /** Product: DEMO / S1 / S2 / S3 */
  @char(6) Product = '';

  /** InSim version */
  @byte() InSimVer = 0;

  @byte() readonly Spare = 0;

  constructor(data?: Partial<IS_VER_Data> | Buffer) {
    super();
    this.initialize(data);
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
