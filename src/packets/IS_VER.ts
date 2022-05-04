import type { Byte } from '../types';
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
export class IS_VER extends BasePacket {
  @byte() readonly Size: Byte = 20;
  @byte() readonly Type = PacketType.ISP_VER;

  /** ReqI as received in the request packet */
  @byte() ReqI: Byte = 0;

  @byte() readonly Zero: 0 = 0;

  /** LFS version, e.g. 0.3G */
  @char(8) Version = '';

  /** Product: DEMO / S1 / S2 / S3 */
  @char(6) Product = '';

  /** InSim version */
  @byte() InSimVer: Byte = 0;

  @byte() readonly Spare: 0 = 0;

  constructor(data?: Buffer) {
    super();
    this.initialize(data);
  }
}
