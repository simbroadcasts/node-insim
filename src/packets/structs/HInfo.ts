import { byte, stringNull } from '../../decorators';
import { Struct } from '../base';
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

export enum HostInfoFlags {
  /** Host requires a spectator password */
  HOS_SPECPASS = 1,

  /** Bit is set if host is licensed */
  HOS_LICENSED = 2,

  /** Bit is set if host is S1 */
  HOS_S1 = 4,

  /** Bit is set if host is S2 */
  HOS_S2 = 8,

  /** Bit is set if host is S3 */
  HOS_S3 = 16,

  /** Bit is set if host is Cruise */
  HOS_CRUISE = 32,

  /** Indicates the first host in the list */
  HOS_FIRST = 64,

  /** Indicates the last host in the list */
  HOS_LAST = 128,
}
