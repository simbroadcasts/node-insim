import { byte, word } from '../utils';
import { AbstractStruct } from './AbstractStruct';

export class NodeLap extends AbstractStruct {
  /** Current path node */
  @word() Node = 0;

  /** Current lap */
  @word() Lap = 0;

  /** Player's unique id */
  @byte() PLID = 0;

  /** Current race position: 0 = unknown, 1 = leader, etc... */
  @byte() Position = 0;

  constructor(data?: Partial<NodeLap>) {
    super();
    this.initialize(data);
  }
}
