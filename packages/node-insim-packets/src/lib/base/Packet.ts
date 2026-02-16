import type { PacketType } from '../enums/PacketType.js';
import type { Receivable } from '../types/Receivable.js';
import { Struct } from './Struct.js';

export abstract class Packet extends Struct implements Receivable {
  abstract Size: number;
  abstract Type: PacketType;
  abstract ReqI: number;
}
