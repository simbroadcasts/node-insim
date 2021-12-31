import { IPacket } from './IPacket';

export type ISendable = IPacket & {
  pack: () => string | Uint8Array;
};
