import type { IPacket } from '../IPacket';

export type PacketData<T extends IPacket> = Partial<
  Omit<T, 'Type' | 'Size' | 'pack' | 'Zero'>
>;
