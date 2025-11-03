import { byte, unsigned, word } from '../decorators';
import { copyBuffer } from '../lfspack';
import { Packet } from './base';
import { PacketType } from './enums';
import { CarContOBJ } from './structs';

/**
 * Hot Lap Validity - off track / hit wall / speeding in pits / out of bounds
 *
 * Set the {@link ISF_HLV} flag in the {@link IS_ISI} to receive reports of incidents that would violate HLVC.
 */
export class IS_HLV extends Packet {
  @byte() readonly Size = 16;
  @byte() readonly Type = PacketType.ISP_HLV;
  @byte() readonly ReqI = 0;

  /** Player's unique id */
  @byte() PLID = 0;

  /** 0: ground / 1: wall / 4: speeding / 5: out of bounds */
  @byte() HLVC: HLVCViolation = 0;

  @byte() private readonly Sp1 = 0;
  @word() private readonly SpW = 0;

  /** Time stamp (ms) */
  @unsigned() Time = 0;

  /** Car contact object */
  C: CarContOBJ = new CarContOBJ();

  unpack(buffer: Uint8Array<ArrayBuffer>): this {
    super.unpack(buffer);

    const start = this.getFormatSize();
    const carContactBuffer = copyBuffer(
      buffer.slice(start, start + new CarContOBJ().getFormatSize()),
    );

    this.C = new CarContOBJ().unpack(carContactBuffer);

    return this;
  }
}

export enum HLVCViolation {
  /** Car drove off track */
  GROUND = 0,

  /** Car hit a wall */
  WALL = 1,

  /** Car was speeding in pit lane */
  SPEEDING = 4,

  /** Car went out of bounds */
  OUT_OF_BOUNDS = 5,
}
