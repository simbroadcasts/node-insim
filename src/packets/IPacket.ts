import { PacketType } from './packetTypes';

export type IPacket = {
  readonly _format: string;
  readonly Size: number;
  readonly Type: PacketType;
  ReqI: number;
  unpack: (data: Buffer) => IPacket;
};
