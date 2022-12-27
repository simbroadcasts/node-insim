import type {
  IS_BTC,
  IS_BTT,
  IS_CNL,
  IS_CPP,
  IS_CPR,
  IS_CRS,
  IS_ISM,
  IS_LAP,
  IS_NCN,
  IS_NPL,
  IS_PLL,
  IS_PLP,
  IS_SMALL,
  IS_STA,
  IS_TINY,
  IS_VER,
  PacketType,
} from '../../packets';
import type { InSim } from './InSim';

export type InSimPacketEvents = {
  [PacketType.ISP_VER]: (packet: IS_VER, inSim: InSim) => void;
  [PacketType.ISP_TINY]: (packet: IS_TINY, inSim: InSim) => void;
  [PacketType.ISP_SMALL]: (packet: IS_SMALL, inSim: InSim) => void;
  [PacketType.ISP_STA]: (packet: IS_STA, inSim: InSim) => void;
  [PacketType.ISP_CPP]: (packet: IS_CPP, inSim: InSim) => void;
  [PacketType.ISP_ISM]: (packet: IS_ISM, inSim: InSim) => void;
  [PacketType.ISP_NCN]: (packet: IS_NCN, inSim: InSim) => void;
  [PacketType.ISP_CNL]: (packet: IS_CNL, inSim: InSim) => void;
  [PacketType.ISP_CPR]: (packet: IS_CPR, inSim: InSim) => void;
  [PacketType.ISP_NPL]: (packet: IS_NPL, inSim: InSim) => void;
  [PacketType.ISP_PLP]: (packet: IS_PLP, inSim: InSim) => void;
  [PacketType.ISP_PLL]: (packet: IS_PLL, inSim: InSim) => void;
  [PacketType.ISP_LAP]: (packet: IS_LAP, inSim: InSim) => void;
  [PacketType.ISP_CRS]: (packet: IS_CRS, inSim: InSim) => void;
  [PacketType.ISP_BTC]: (packet: IS_BTC, inSim: InSim) => void;
  [PacketType.ISP_BTT]: (packet: IS_BTT, inSim: InSim) => void;
};

export type InSimEvents = InSimPacketEvents & {
  connect: () => void;
  disconnect: () => void;
  error: (error: InSimError) => void;
};

export class InSimError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InSimError';
  }
}
