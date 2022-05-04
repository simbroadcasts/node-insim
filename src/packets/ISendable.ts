import type { IPacket } from './IPacket';

export type ISendable = IPacket & {
  pack: () => Buffer;
};
