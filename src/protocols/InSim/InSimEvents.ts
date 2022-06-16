import type {
  IS_BTC,
  IS_BTT,
  IS_CNL,
  IS_CPR,
  IS_ISI,
  IS_NCN,
  IS_SCH,
  IS_SMALL,
  IS_STA,
  IS_TINY,
  IS_VER,
  PacketType,
} from '../../packets';
import type { InSim } from './InSim';

export type InSimPacketEvents = {
  [PacketType.ISP_ISI]: (packet: IS_ISI, inSim: InSim) => void;
  [PacketType.ISP_VER]: (packet: IS_VER, inSim: InSim) => void;
  [PacketType.ISP_TINY]: (packet: IS_TINY, inSim: InSim) => void;
  [PacketType.ISP_SMALL]: (packet: IS_SMALL, inSim: InSim) => void;
  [PacketType.ISP_BTC]: (packet: IS_BTC, inSim: InSim) => void;
  [PacketType.ISP_BTT]: (packet: IS_BTT, inSim: InSim) => void;
  [PacketType.ISP_STA]: (packet: IS_STA, inSim: InSim) => void;
  [PacketType.ISP_SCH]: (packet: IS_SCH, inSim: InSim) => void;
  [PacketType.ISP_NCN]: (packet: IS_NCN, inSim: InSim) => void;
  [PacketType.ISP_CNL]: (packet: IS_CNL, inSim: InSim) => void;
  [PacketType.ISP_CPR]: (packet: IS_CPR, inSim: InSim) => void;
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
