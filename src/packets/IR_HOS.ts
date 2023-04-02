import { byte } from '../decorators';
import { copyBuffer } from '../lfspack';
import { Packet } from './base';
import { PacketType } from './enums';
import { HInfo } from './structs';

/**
 * Hostlist (hosts connected to the Relay)
 */
export class IR_HOS extends Packet {
  SIZE_MULTIPLIER = 1;

  /** 4 + NumHosts * 40 */
  @byte() readonly Size = 4;

  @byte() readonly Type = PacketType.IRP_HOS;

  /** As given in {@link IR_HLR} */
  @byte() ReqI = 0;

  /** Number of hosts described in this packet */
  @byte() NumHosts = 0;

  /** Host info for every host in the Relay. 1 to 6 of these in a {@link IR_HOS} */
  Info: HInfo[] = [];

  unpack(buffer: Uint8Array): this {
    super.unpack(buffer);

    const hostInfoOffset = this.getFormatSize();
    const hostInfoLength = new HInfo().getFormatSize();

    for (let i = 0; i < this.NumHosts; i++) {
      const start = hostInfoOffset + hostInfoLength * i;
      const hostInfoBuffer = copyBuffer(
        buffer.slice(start, start + hostInfoLength),
      );
      this.Info.push(new HInfo().unpack(hostInfoBuffer));
    }

    return this;
  }
}
