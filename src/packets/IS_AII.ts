import { byte, float, struct, unsigned } from '../decorators';
import type { DashLights } from '../out/DashLights';
import { OutSimMain } from '../out/OutSimMain';
import { Packet } from './base';
import type { AIFlags } from './enums';
import { PacketType } from './enums';
import { AICGear } from './IS_AIC';

/**
 * AI car info
 *
 * Send a {@link SMALL_AII} with UVal set to PLID to receive current information about a local car.
 */
export class IS_AII extends Packet {
  @byte() readonly Size = 96;
  @byte() readonly Type = PacketType.ISP_AII;

  /** ReqI from the {@link SMALL_AII} request packet */
  @byte() ReqI = 0;

  @byte() PLID = 0;
  @struct(OutSimMain) OSData = new OutSimMain();
  @byte() Flags: AIFlags | 0 = 0;

  /** Reverse: 0, Neutral: 1, First: 2... */
  @byte() Gear: AICGear = AICGear.REVERSE;

  @byte() readonly Sp2 = 0;
  @byte() readonly Sp3 = 0;

  @float() RPM = 0;
  @float() readonly SpF0 = 0;
  @float() readonly SpF1 = 0;

  /** Dash lights currently switched on (see DL_x in OutGauge section below) */
  @unsigned() ShowLights: DashLights | 0 = 0;

  @unsigned() readonly SPU1 = 0;
  @unsigned() readonly SPU2 = 0;
  @unsigned() readonly SPU3 = 0;
}
