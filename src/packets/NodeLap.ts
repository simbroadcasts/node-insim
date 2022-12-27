import { byte, word } from '../utils';
import { Struct } from './base';
import type { StructData } from './types';

export class NodeLap extends Struct {
  /** Current path node */
  @word() Node = 0;

  /** Current lap */
  @word() Lap = 0;

  /** Player's unique id */
  @byte() PLID = 0;

  /** Current race position: 0 = unknown, 1 = leader, etc... */
  @byte() Position = 0;

  constructor(data?: StructData<NodeLap>) {
    super();
    this.initialize(data);
  }
}
