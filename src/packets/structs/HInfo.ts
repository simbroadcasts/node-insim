import { byte, stringNull } from '../../decorators';
import { Struct } from '../base';
import type { HostInfoFlags } from '../enums';
import type { StructData } from '../types';

/** Sub packet for {@link IR_HOS}. Contains host information */
export class HInfo extends Struct {
  /** Name of the host */
  @stringNull(32) HName = '';

  /** Short track name */
  @stringNull(6) Track = '';

  /** Info flags about the host */
  @byte() Flags: HostInfoFlags | 0 = 0;

  /** Number of people on the host */
  @byte() NumConns = 0;

  constructor(data?: StructData<HInfo>) {
    super();
    this.initialize(data);
  }
}
