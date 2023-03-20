import { byte } from '../utils';
import { Packet } from './base';
import { PacketType } from './enums';

/**
 * Admin Response
 *
 * The Relay will reply to admin status request.
 */
export class IR_ARP extends Packet {
  @byte() readonly Size = 4;
  @byte() readonly Type = PacketType.IRP_ARP;
  @byte() ReqI = 0;

  /** 0 - no admin; 1 - admin */
  @byte() Admin = 0;
}
