import { byte } from '../utils';
import { SendablePacket } from './base';
import type { PMOFlags } from './enums';
import { PacketType, PMOAction } from './enums';
import { ObjectInfo } from './structs';
import type { PacketData } from './types';

/**
 * AutoX Multiple objects - variable size
 *
 * Set the {@link ISF_AXM_LOAD} flag in the {@link IS_ISI} for info about objects when
 * a layout is loaded.
 *
 * Set the {@link ISF_AXM_EDIT} flag in the {@link IS_ISI} for info about objects
 * edited by user or InSim.
 */
export class IS_AXM extends SendablePacket {
  public static readonly MAX_OBJECTS = 60;

  /** 8 + NumO * 8 */
  @byte() Size = 8;
  @byte() readonly Type = PacketType.ISP_AXM;

  /** 0 unless this is a reply to a {@link TINY_AXM} request */
  @byte() ReqI = 0;

  /** Number of objects in this packet */
  @byte() NumO = 0;

  /** Unique id of the connection that sent the packet */
  @byte() UCID = 0;

  @byte() PMOAction: PMOAction = PMOAction.PMO_LOADING_FILE;
  @byte() PMOFlags: PMOFlags | 0 = 0;
  @byte() private readonly Sp3 = 0;

  Info: ObjectInfo[] = [];

  private readonly objectInfoOffset = 8;

  constructor(data?: IS_AXM_Data) {
    super();
    this.initialize(data);
  }

  unpack(buffer: Uint8Array): this {
    super.unpack(buffer);

    const objectInfoLength = new ObjectInfo().getFormatSize();

    for (let i = 0; i < this.NumO; i++) {
      const start = this.objectInfoOffset + objectInfoLength * i;
      const objectInfoBuffer = buffer.slice(start, start + objectInfoLength);
      this.Info.push(new ObjectInfo().unpack(objectInfoBuffer));
    }

    return this;
  }

  pack() {
    if (this.Info.length > IS_AXM.MAX_OBJECTS) {
      throw new RangeError(
        `IS_AXM - Too many objects set (max is ${IS_AXM.MAX_OBJECTS}`,
      );
    }

    const objectInfoLength = new ObjectInfo().getFormatSize();
    this.Size = this.objectInfoOffset + this.Info.length * objectInfoLength;

    const dataBuffer = super.pack();
    const objectInfoBuffer = this.Info.reduce(
      (acc, objectInfo) => new Uint8Array([...acc, ...objectInfo.pack()]),
      new Uint8Array(),
    );

    return new Uint8Array([...dataBuffer, ...objectInfoBuffer]);
  }
}

export type IS_AXM_Data = PacketData<IS_AXM>;
