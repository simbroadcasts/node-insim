import { byte, determineLength } from '../utils';
import { AbstractSendablePacket } from './base';
import type { PMOAction, PMOFlags } from './enums';
import { PacketType } from './enums';
import { ObjectInfo } from './ObjectInfo';
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
export class IS_AXM extends AbstractSendablePacket {
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

  @byte() PMOAction: PMOAction = 0;
  @byte() PMOFlags: PMOFlags = 0;
  @byte() readonly Sp3 = 0;

  Info: ObjectInfo[] = [];

  constructor(data?: IS_AXM_Data) {
    super();
    this.initialize(data);
  }

  unpack(buffer: Buffer): this {
    super.unpack(buffer);

    const objectInfoLength = determineLength(new ObjectInfo().getFormat());

    for (let i = 0; i < this.NumO; i++) {
      const start = 8 + objectInfoLength * i;
      const objectInfoBuffer = buffer.slice(start, start + objectInfoLength);
      this.Info.push(new ObjectInfo().unpack(objectInfoBuffer));
    }

    return this;
  }

  pack(): Buffer {
    if (this.Info.length > IS_AXM.MAX_OBJECTS) {
      throw new RangeError(
        `IS_AXM - Too many objects set (max is ${IS_AXM.MAX_OBJECTS}`,
      );
    }

    const objectInfoLength = determineLength(new ObjectInfo().getFormat());
    this.Size = 8 + this.Info.length * objectInfoLength;

    const dataBuffer = super.pack();
    const objectInfoBuffer = this.Info.map((objectInfo) => objectInfo.pack());

    return Buffer.concat([dataBuffer, ...objectInfoBuffer]);
  }
}

export type IS_AXM_Data = PacketData<IS_AXM>;
