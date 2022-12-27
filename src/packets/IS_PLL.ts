import { byte } from '../utils';
import { AbstractPacket } from './AbstractPacket';
import { PacketType } from './enums';
import type { PacketData } from './types';

/**
 * PLayer Leave race (spectate - removed from player list)
 */
export class IS_PLL extends AbstractPacket {
  @byte() readonly Size = 4;
  @byte() readonly Type = PacketType.ISP_PLL;
  @byte() readonly ReqI: 0 = 0;

  /** Player's unique id */
  @byte() PLID = 0;
}

export type IS_PLL_Data = PacketData<IS_PLL>;
