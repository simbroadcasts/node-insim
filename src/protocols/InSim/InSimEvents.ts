import type {
  IS_BTC,
  IS_BTT,
  IS_CCH,
  IS_CNL,
  IS_CPP,
  IS_CPR,
  IS_CRS,
  IS_III,
  IS_ISM,
  IS_LAP,
  IS_MSO,
  IS_NCN,
  IS_NPL,
  IS_PIT,
  IS_PLA,
  IS_PLL,
  IS_PLP,
  IS_PSF,
  IS_RST,
  IS_SMALL,
  IS_SPX,
  IS_STA,
  IS_TINY,
  IS_VER,
  IS_VTN,
  PacketType,
} from '../../packets';
import type { InSim } from './InSim';

export type InSimPacketEvents = {
  [PacketType.ISP_RST]: (packet: IS_RST, inSim: InSim) => void;
  [PacketType.ISP_VER]: (packet: IS_VER, inSim: InSim) => void;
  [PacketType.ISP_TINY]: (packet: IS_TINY, inSim: InSim) => void;
  [PacketType.ISP_SMALL]: (packet: IS_SMALL, inSim: InSim) => void;
  [PacketType.ISP_STA]: (packet: IS_STA, inSim: InSim) => void;
  [PacketType.ISP_CPP]: (packet: IS_CPP, inSim: InSim) => void;
  [PacketType.ISP_ISM]: (packet: IS_ISM, inSim: InSim) => void;
  [PacketType.ISP_MSO]: (packet: IS_MSO, inSim: InSim) => void;
  [PacketType.ISP_III]: (packet: IS_III, inSim: InSim) => void;
  [PacketType.ISP_VTN]: (packet: IS_VTN, inSim: InSim) => void;
  [PacketType.ISP_NCN]: (packet: IS_NCN, inSim: InSim) => void;
  [PacketType.ISP_CNL]: (packet: IS_CNL, inSim: InSim) => void;
  [PacketType.ISP_CPR]: (packet: IS_CPR, inSim: InSim) => void;
  [PacketType.ISP_NPL]: (packet: IS_NPL, inSim: InSim) => void;
  [PacketType.ISP_PLP]: (packet: IS_PLP, inSim: InSim) => void;
  [PacketType.ISP_PLL]: (packet: IS_PLL, inSim: InSim) => void;
  [PacketType.ISP_LAP]: (packet: IS_LAP, inSim: InSim) => void;
  [PacketType.ISP_SPX]: (packet: IS_SPX, inSim: InSim) => void;
  [PacketType.ISP_PIT]: (packet: IS_PIT, inSim: InSim) => void;
  [PacketType.ISP_PSF]: (packet: IS_PSF, inSim: InSim) => void;
  [PacketType.ISP_PLA]: (packet: IS_PLA, inSim: InSim) => void;
  [PacketType.ISP_CCH]: (packet: IS_CCH, inSim: InSim) => void;
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
