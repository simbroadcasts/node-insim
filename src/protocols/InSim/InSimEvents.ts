import type {
  IS_BTC,
  IS_BTT,
  IS_ISI,
  IS_SMALL,
  IS_STA,
  IS_TINY,
  IS_VER,
  PacketType,
} from '../../packets';
import type { InSim } from './InSim';

export type InSimPacketEvents = {
  [PacketType.ISP_ISI]: (packet: IS_ISI, insim: InSim) => void;
  [PacketType.ISP_VER]: (packet: IS_VER, insim: InSim) => void;
  [PacketType.ISP_TINY]: (packet: IS_TINY, insim: InSim) => void;
  [PacketType.ISP_SMALL]: (packet: IS_SMALL, insim: InSim) => void;
  [PacketType.ISP_BTC]: (packet: IS_BTC, insim: InSim) => void;
  [PacketType.ISP_BTT]: (packet: IS_BTT, insim: InSim) => void;
  [PacketType.ISP_STA]: (packet: IS_STA, insim: InSim) => void;
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
