import {
  byte,
  carName,
  float,
  int,
  string,
  unsigned,
  word,
} from '../decorators';
import { Struct } from '../packets';
import type { DashLights } from './DashLights';
import type { OutGaugeFlags } from './OutGaugeFlags';

export class OutGaugePack extends Struct {
  static readonly MIN_SIZE = 92;
  static readonly MAX_SIZE = 96;

  /** Time in milliseconds (to check order) */
  @unsigned() Time = 0;

  /** Car name */
  @carName() Car = '';

  @word() Flags: OutGaugeFlags = 0;

  /** Reverse: 0, Neutral: 1, First: 2,... */
  @byte() Gear = 0;

  /** Unique ID of viewed player (0 = none) */
  @byte() PLID = 0;

  /** m/s */
  @float() Speed = 0;

  /** RPM */
  @float() RPM = 0;

  /** bar */
  @float() Turbo = 0;

  /** C */
  @float() EngTemp = 0;

  /** 0 to 1 */
  @float() Fuel = 0;

  /** bar */
  @float() OilPressure = 0;

  /** C */
  @float() OilTemp = 0;

  /** Dash lights available */
  @unsigned() DashLights: DashLights = 0;

  /** Dash lights currently switched on */
  @unsigned() ShowLights: DashLights = 0;

  /** 0 to 1 */
  @float() Throttle = 0;

  /** 0 to 1 */
  @float() Brake = 0;

  /** 0 to 1 */
  @float() Clutch = 0;

  /** Usually Fuel */
  @string(16) Display1 = '';

  /** Usually Settings */
  @string(16) Display2 = '';

  /** Optional - only if OutGauge ID is specified */
  @int() ID = 0;

  unpack(buffer: Uint8Array): this {
    let outGaugeData = buffer;

    if (buffer.length === OutGaugePack.MIN_SIZE) {
      outGaugeData = new Uint8Array(OutGaugePack.MAX_SIZE);
      outGaugeData.set(buffer);
      outGaugeData.set([0], OutGaugePack.MIN_SIZE);
    }

    return super.unpack(outGaugeData);
  }
}
