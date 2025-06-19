import type { packetTypeToClass } from 'node-insim/packets';

import type { InSim } from './InSim';
import type { InSimPacketClassInstance } from './packets/types';

export type InSimPacketEvents = {
  [TPacketType in keyof typeof packetTypeToClass]: (
    packet: InSimPacketClassInstance<TPacketType>,
    inSim: InSim,
  ) => void;
};

export type InSimEvents = InSimPacketEvents & {
  connect: (inSim: InSim) => void;
  disconnect: (inSim: InSim) => void;
};
