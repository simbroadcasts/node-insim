import { IPacket } from './IPacket';

export type ISendable = IPacket & {
  pack: () => Buffer;
};
