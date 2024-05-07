import type { Parsed } from 'typed-binary';
import { byte, object } from 'typed-binary';

import { Packet } from './base';
import { size } from './base/SizeSchema';
import { PacketType } from './enums';

const IS_CRS_Schema = object({
  Size: size,
  Type: byte,
  ReqI: byte,
  PLID: byte,
});

/**
 * Car ReSet
 */
export class IS_CRS extends Packet implements Parsed<typeof IS_CRS_Schema> {
  protected schema = IS_CRS_Schema;

  readonly Size = 4;
  readonly Type = PacketType.ISP_CRS;
  readonly ReqI = 0;

  /** Player's unique id */
  PLID = 0;
}
