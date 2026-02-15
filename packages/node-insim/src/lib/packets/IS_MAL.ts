import { byte } from '../decorators';
import { InSimError } from '../errors';
import { copyBuffer, pack, unpack } from '../lfspack';
import { SendablePacket } from './base';
import { PacketType } from './enums';
import type { PacketData } from './types';

/**
 * Mods ALlowed - variable size
 */
export class IS_MAL extends SendablePacket {
  static readonly MAX_MODS = 120;

  /** 8 + NumM * 4 */
  @byte() Size = 8;

  @byte() readonly Type = PacketType.ISP_MAL;

  /** 0 unless this is a reply to a {@link TINY_MAL} request */
  @byte() ReqI = 0;

  /** Number of mods in this packet */
  @byte() NumM = 0;

  /** Unique id of the connection that updated the list */
  @byte() UCID = 0;

  /** Zero (for now) */
  @byte() private readonly Flags = 0;

  @byte() private readonly Sp2 = 0;
  @byte() private readonly Sp3 = 0;

  /** SkinID of each mod in compressed format, 0 to {@link MAX_MODS} (NumM) */
  SkinID: string[] = [];

  private readonly skinIdOffset = 8;
  private readonly skinIdSize = 4;

  constructor(data?: IS_MAL_Data) {
    super();
    this.initialize(data);
  }

  override unpack(buffer: Uint8Array<ArrayBuffer>): this {
    super.unpack(buffer);

    this.SkinID = [];
    for (let i = 0; i < this.NumM; i++) {
      const start = this.skinIdOffset + this.skinIdSize * i;
      const skinIdBuffer = copyBuffer(
        buffer.slice(start, start + this.skinIdSize),
      );
      const data = unpack('C', skinIdBuffer.buffer);
      if (data) {
        this.SkinID.push(data[0] as string);
      }
    }

    return this;
  }

  override pack() {
    if (this.SkinID.length > IS_MAL.MAX_MODS) {
      throw new RangeError(
        `IS_MAL - Too many SkinIDs set (max is ${IS_MAL.MAX_MODS}`,
      );
    }

    this.NumM = this.SkinID.length;
    this.Size = this.skinIdOffset + this.SkinID.length * this.skinIdSize;

    const dataBuffer = super.pack();

    const objectInfoBufferOrNull = this.SkinID.map((skinId) =>
      pack('C', [skinId]),
    );

    if (objectInfoBufferOrNull.some((buffer) => buffer === null)) {
      throw new InSimError('IS_MAL - Could not pack all SkinIDs');
    }

    const objectInfoBuffer = (objectInfoBufferOrNull as Uint8Array[]).reduce(
      (acc, objectInfo) => new Uint8Array([...acc, ...objectInfo]),
      new Uint8Array(),
    );

    return new Uint8Array([...dataBuffer, ...objectInfoBuffer]);
  }
}

export type IS_MAL_Data = Pick<PacketData<IS_MAL>, 'SkinID'>;
