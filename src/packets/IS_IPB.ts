import { byte } from '../decorators';
import { InSimError } from '../errors';
import { copyBuffer, pack } from '../lfspack';
import { ipToUnsignedInteger, isValidIPv4 } from '../utils/ip';
import { SendablePacket } from './base';
import { PacketType } from './enums';
import type { PacketData } from './types';

/**
 * IP Bans
 *
 * You can set up to 120 IP addresses that are not allowed to join a host
 */
export class IS_IPB extends SendablePacket {
  static readonly MAX_BANS = 120;

  /** 8 + NumB * 4 */
  @byte() Size = 8;
  @byte() readonly Type = PacketType.ISP_IPB;

  /** 0 unless this is a reply to a {@link TINY_IPB} request */
  @byte() ReqI = 0;

  /** Number of bans in this packet */
  @byte() NumB = 0;

  @byte() readonly Sp0 = 0;
  @byte() readonly Sp1 = 0;
  @byte() readonly Sp2 = 0;
  @byte() readonly Sp3 = 0;

  /** IP addresses, 0 to {@link MAX_BANS} ({@link NumB}) */
  BanIPs: string[] = [];

  private readonly banIPsOffset = 8;
  private readonly banIPSize = 4;

  constructor(data?: IS_IPB_Data) {
    super();
    this.initialize(data);
  }

  unpack(buffer: Uint8Array): this {
    super.unpack(buffer);

    this.BanIPs = [];
    for (let i = 0; i < this.NumB; i++) {
      const start = this.banIPsOffset + this.banIPSize * i;
      const ipAddressBuffer = copyBuffer(
        buffer.slice(start, start + this.banIPSize),
      );
      const ipAddress = ipAddressBuffer.join('.');
      this.BanIPs.push(ipAddress);
    }

    return this;
  }

  pack() {
    if (this.BanIPs.length > IS_IPB.MAX_BANS) {
      throw new RangeError(
        `IS_IPB - Too many BanIPs set (max is ${IS_IPB.MAX_BANS}`,
      );
    }

    const invalidIPs = this.BanIPs.filter(
      (ipAddress) => !isValidIPv4(ipAddress),
    );

    if (invalidIPs.length > 0) {
      throw new RangeError(
        `IS_IPB - The following IP addresses are not valid IPv4: ${invalidIPs.join()}`,
      );
    }

    this.NumB = this.BanIPs.length;
    this.Size = this.banIPsOffset + this.BanIPs.length * this.banIPSize;

    const dataBuffer = super.pack();

    const maybeIPBuffer = this.BanIPs.map((ipAddress) =>
      pack('L', [ipToUnsignedInteger(ipAddress)]),
    );

    if (maybeIPBuffer.some((buffer) => buffer === null)) {
      throw new InSimError('IS_IPB - Failed to pack all BanIPs');
    }

    const banIPsBuffer = (maybeIPBuffer as Uint8Array[]).reduce(
      (acc, banIPs) => new Uint8Array([...acc, ...banIPs]),
      new Uint8Array(),
    );

    return new Uint8Array([...dataBuffer, ...banIPsBuffer]);
  }
}

export type IS_IPB_Data = Pick<PacketData<IS_IPB>, 'BanIPs'>;
