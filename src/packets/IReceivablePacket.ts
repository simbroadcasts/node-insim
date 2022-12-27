import type { IPacket } from './IPacket';
import type { IReceivable } from './IReceivable';

export type IReceivablePacket = IPacket & IReceivable;
