import { byte, determineLength, short, word } from '../utils';
import { AbstractPacket } from './AbstractPacket';
import { AbstractStruct } from './AbstractStruct';
import type { ObjectHitFlags } from './enums';
import { PacketType } from './enums';

/**
 * OBject Hit - car hit an autocross object or an unknown object
 *
 * Set the {@link ISF_OBH} flag in the {@link IS_ISI} to receive object contact reports.
 */
export class IS_OBH extends AbstractPacket {
  @byte() readonly Size = 24;
  @byte() readonly Type = PacketType.ISP_OBH;
  @byte() readonly ReqI = 0;

  /** Player's unique id */
  @byte() PLID = 0;

  /** High 4 bits: reserved / low 12 bits: closing speed (10 = 1 m/s) */
  @word() SpClose = 0;

  /** Looping time stamp (hundredths - time since reset - like {@link TINY_GTH}) */
  @word() Time = 0;

  /** Contact object */
  C: CarContOBJ = new CarContOBJ();

  /** Position (1 metre = 16) */
  @short() X = 0;

  /** Position (1 metre = 16) */
  @short() Y = 0;

  /** If {@link OBH_LAYOUT} is set: Zbyte as in {@link ObjectInfo} */
  @byte() Zbyte = 0;

  @byte() readonly Sp1 = 0;

  /** AXO_x as in {@link ObjectInfo} or zero if it is an unknown object */
  @byte() Index = 0;

  @byte() OBHFlags: ObjectHitFlags = 0;

  unpack(buffer: Buffer): this {
    const carContactDataOffset = 8;
    const carContactDataLength = determineLength(new CarContOBJ().getFormat());
    const carContactDataEnd = carContactDataOffset + carContactDataLength;

    const bufferBeforeContactData = buffer.slice(0, carContactDataOffset);
    const bufferAfterContactData = buffer.slice(carContactDataEnd);

    const dataBuffer = Buffer.concat([
      bufferBeforeContactData,
      bufferAfterContactData,
    ]);
    super.unpack(dataBuffer);

    const carContactBuffer = buffer.slice(
      carContactDataOffset,
      carContactDataEnd,
    );
    this.C = new CarContOBJ().unpack(carContactBuffer);

    return this;
  }
}

export class CarContOBJ extends AbstractStruct {
  /** Car's motion if Speed > 0: 0 = world y direction, 128 = 180 deg */
  @byte() Direction = 0;

  /** Direction of forward axis: 0 = world y direction, 128 = 180 deg */
  @byte() Heading = 0;

  /** m/s */
  @byte() Speed = 0;

  @byte() Zbyte = 0;

  /** Position (1 metre = 16) */
  @short() X = 0;

  /** Position (1 metre = 16) */
  @short() Y = 0;
}
