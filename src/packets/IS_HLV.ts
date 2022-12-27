import { byte, determineLength, word } from '../utils';
import { AbstractPacket } from './base';
import { CarContOBJ } from './CarContOBJ';
import type { HLVCViolation } from './enums';
import { PacketType } from './enums';

/**
 * Hot Lap Validity - off track / hit wall / speeding in pits / out of bounds
 *
 * Set the {@link ISF_HLV} flag in the {@link IS_ISI} to receive reports of incidents that would violate HLVC.
 */
export class IS_HLV extends AbstractPacket {
  @byte() readonly Size = 16;
  @byte() readonly Type = PacketType.ISP_HLV;
  @byte() readonly ReqI = 0;

  /** Player's unique id */
  @byte() PLID = 0;

  /** 0: ground / 1: wall / 4: speeding / 5: out of bounds */
  @byte() HLVC: HLVCViolation = 0;

  @byte() private readonly Sp1 = 0;

  /** Looping time stamp (hundredths - time since reset - like {@link TINY_GTH}) */
  @word() Time = 0;

  /** Car contact object */
  C: CarContOBJ = new CarContOBJ();

  unpack(buffer: Buffer): this {
    super.unpack(buffer);

    const carContactLength = determineLength(
      `<${new CarContOBJ().getFormat()}`,
    );
    const start = determineLength(`<${this.getFormat()}`);
    const carContactBuffer = buffer.slice(start, start + carContactLength);

    this.C = new CarContOBJ().unpack(carContactBuffer);

    return this;
  }
}
