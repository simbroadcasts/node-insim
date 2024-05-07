import type { InSim } from './InSim';
import type { packetTypeToClass } from './packets';

export type InSimPacketEvents = {
  [k in keyof typeof packetTypeToClass]: (
    packet: (typeof packetTypeToClass)[k]['prototype'],
    inSim: InSim,
  ) => void;
};

export type InSimEvents = InSimPacketEvents & {
  connect: (inSim: InSim) => void;
  disconnect: (inSim: InSim) => void;
};
