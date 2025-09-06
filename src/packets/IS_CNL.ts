import { z } from 'zod';

import { byte } from '../decorators';
import { Packet } from './base';
import { PacketType } from './enums';

const utf8ToBytes = z.codec(z.instanceof(Uint8Array), z.string(), {
  encode: (str) => new TextEncoder().encode(str) as Uint8Array<ArrayBuffer>,
  decode: (bytes) => new TextDecoder().decode(bytes),
});

const packet = z.object({
  Text: utf8ToBytes,
});

const binaryPacket = z.codec(z.instanceof(Uint8Array), packet, {
  encode: (packet) => z.encode(packet.Text),
  decode: (bytes) => {},
});

const binary = packet.encode({
  Text: 'aa',
});

utf8ToBytes.encode('Hello, 世界!'); // => Uint8Array
// utf8ToBytes.encode(bytes); // => "Hello, 世界!"

/**
 * ConN Leave
 */
export class IS_CNL extends Packet {
  @byte() readonly Size = 8;
  @byte() readonly Type = PacketType.ISP_CNL;

  /** 0 */
  @byte() readonly ReqI = 0;

  /** Unique id of the connection which left */
  @byte() UCID = 0;

  /** Leave reason (see below) */
  @byte() Reason: LeaveReason = 0;

  /** Number of connections including host */
  @byte() Total = 0;

  @byte() private readonly Sp2 = 0;
  @byte() private readonly Sp3 = 0;
}

export enum LeaveReason {
  /** None */
  LEAVR_DISCO,

  /** Timed out */
  LEAVR_TIMEOUT,

  /** Lost connection */
  LEAVR_LOSTCONN,

  /** Kicked */
  LEAVR_KICKED,

  /** Banned */
  LEAVR_BANNED,

  /** Security */
  LEAVR_SECURITY,

  /** Cheat protection warning */
  LEAVR_CPW,

  /** Out of sync with host */
  LEAVR_OOS,

  /** Join OOS (initial sync failed) */
  LEAVR_JOOS,

  /** Invalid packet */
  LEAVR_HACK,
}
