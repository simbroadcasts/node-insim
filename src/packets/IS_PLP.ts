import { byte } from '../utils';
import { BasePacket } from './BasePacket';
import { PacketType } from './enums';
import type { PacketData } from './types';

/**
 * PLayer Pits (go to settings - stays in player list)
 */
export class IS_PLP extends BasePacket {
  @byte() readonly Size = 4;
  @byte() readonly Type = PacketType.ISP_PLP;
  @byte() readonly ReqI: 0 = 0;

  /** Player's unique id */
  @byte() PLID = 0;
}

export type IS_PLP_Data = PacketData<IS_PLP>;
