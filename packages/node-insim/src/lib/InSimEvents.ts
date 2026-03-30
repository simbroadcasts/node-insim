import type {
  InSimPacketInstance,
  packetTypeToClass,
} from 'node-insim-packets';

import type { InSim } from './InSim.js';

export type InSimPacketEvents = {
  [TPacketType in keyof typeof packetTypeToClass]: (
    packet: InSimPacketInstance<TPacketType>,
    inSim: InSim,
  ) => void;
};

export type InSimEvents = InSimPacketEvents & {
  connect: (inSim: InSim) => void;
  disconnect: (inSim: InSim) => void;
  error: (error: Error) => void;
};
