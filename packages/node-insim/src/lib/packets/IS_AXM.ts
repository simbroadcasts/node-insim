import { byte } from '../decorators';
import { copyBuffer } from '../lfspack';
import { SendablePacket } from './base';
import { PacketType } from './enums';
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

  override unpack(buffer: Uint8Array<ArrayBuffer>): this {
    super.unpack(buffer);

    const objectInfoLength = new ObjectInfo().getFormatSize();

    for (let i = 0; i < this.NumO; i++) {
      const start = this.objectInfoOffset + objectInfoLength * i;
      const objectInfoBuffer = copyBuffer(
        buffer.slice(start, start + objectInfoLength),
      );
      this.Info.push(new ObjectInfo().unpack(objectInfoBuffer));
    }

    return this;
  }

  override pack() {
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

export enum PMOAction {
  /** Sent by the layout loading system only */
  PMO_LOADING_FILE,

  /** Adding objects (from InSim or editor) */
  PMO_ADD_OBJECTS,

  /** Delete objects (from InSim or editor) */
  PMO_DEL_OBJECTS,

  /** Clear all objects (NumO must be zero) */
  PMO_CLEAR_ALL,

  /** A reply to a {@link TINY_AXM} request */
  PMO_TINY_AXM,

  /** A reply to a {@link TTC_SEL} request */
  PMO_TTC_SEL,

  /** Set a connection's layout editor selection */
  PMO_SELECTION,

  /**
   * User pressed O without anything selected
   *
   * An {@link IS_AXM} with PMO_POSITION is sent with a single object in the packet if a user
   * presses O without any object type selected. Information only - no object is added.
   * The only valid values in Info are X, Y, Zbyte and Heading.
   */
  PMO_POSITION,

  /**
   * Request Z values / reply with Z values
   *
   * `PMO_GET_Z` can be used to request the resulting Zbyte values for given X, Y, Zbyte
   * positions listed in the {@link IS_AXM}. A similar reply (information only) will be sent
   * with adjusted Zbyte values. Index and Heading are ignored and set to zero in the
   * reply. Flags is set to 0x80 if Zbyte was successfully adjusted, zero if not.
   * Suggested input values for Zbyte are either 240 to get the highest point at X, Y
   * or you may use the approximate altitude (see layout file format).
   */
  PMO_GET_Z,
}

export enum PMOFlags {
  /**
   * If PMO_FILE_END is set in a {@link PMO_LOADING_FILE} packet, LFS has reached
   * the end of a layout file which it is loading.
   */
  PMO_FILE_END = 1,

  /**
   * When objects are moved or modified in the layout editor, two {@link IS_AXM} packets
   * are sent. A {@link PMO_DEL_OBJECTS} followed by a {@link PMO_ADD_OBJECTS}. In this
   * case the flag {@link PMO_MOVE_MODIFY} is set in the {@link PMOFlags} byte of both
   * packets.
   */
  PMO_MOVE_MODIFY = 2,

  /**
   * If you send an {@link IS_AXM} with {@link PMOAction} of {@link PMO_SELECTION} it is
   * possible for it to be either a selection of real objects (as if the user selected
   * several objects while holding the CTRL key) or a clipboard selection (as if the user
   * pressed CTRL+C after selecting objects). Clipboard is the default selection mode.
   * A real selection can be set by using the {@link PMO_SELECTION_REAL} bit in the
   * {@link PMOFlags} byte.
   */
  PMO_SELECTION_REAL = 4,

  /**
   * If you send an {@link IS_AXM} with {@link PMOAction} of {@link PMO_ADD_OBJECTS}
   * you may wish to set the UCID to one of the guest connections (for example if that
   * user's action caused the objects to be added). In this case some validity checks
   * are done on the guest's computer which may report "invalid position" or
   * "intersecting object" and delete the objects. This can be avoided by setting the
   * {@link PMO_AVOID_CHECK} bit.
   */
  PMO_AVOID_CHECK = 8,
}
