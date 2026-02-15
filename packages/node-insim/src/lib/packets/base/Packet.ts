import type { PacketType } from '../enums';
import type { Receivable } from '../types';
import { Struct } from './Struct';

export abstract class Packet extends Struct implements Receivable {
  abstract Size: number;
  abstract Type: PacketType;
  abstract ReqI: number;
}
