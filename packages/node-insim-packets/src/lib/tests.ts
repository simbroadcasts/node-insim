import { printDiffOrStringify } from 'jest-matcher-utils';

import type { Packet } from './base/Packet.js';
import type { SendablePacket } from './base/SendablePacket.js';
import type { PacketType } from './enums/PacketType.js';

type CommonPacketPropsWithoutReqI = Exclude<keyof SendablePacket, 'ReqI'>;

export type PacketTestData<P extends Packet> = Partial<
  Omit<P, CommonPacketPropsWithoutReqI>
>;

type TestPacketParams<Data extends PacketTestData<P>, P extends Packet> = {
  packetClass: { new (data?: Data): P };
  size: number;
  type: PacketType;
  data: Data;
  buffer: Uint8Array<ArrayBuffer>;
};

export function testBothWaysPacket<
  Packet extends SendablePacket,
  Data extends PacketTestData<Packet>,
>(params: TestPacketParams<Data, Packet>) {
  testInfoPacket(params);
  testInstructionPacket(params);
}

export function testInfoPacket<
  P extends Packet,
  Data extends PacketTestData<P>,
>({ packetClass, size, type, data, buffer }: TestPacketParams<Data, P>) {
  it('should unpack data from a buffer into a packet instance', () => {
    const packet = new packetClass().unpack(buffer);

    Object.entries(data).forEach(([key, expectedValue]) => {
      const actualValue = packet[key as keyof P];
      try {
        expect(actualValue).toEqual(expectedValue);
      } catch {
        const diff = printDiffOrStringify(
          expectedValue,
          actualValue,
          'Expected',
          'Received',
          true,
        );
        throw new Error(`Unexpected value of property ${key}\n${diff}`);
      }
    });

    expect(packet.Size).toEqual(size);
    expect(packet.Type).toEqual(type);
  });
}

export function testInstructionPacket<
  Packet extends SendablePacket,
  Data extends PacketTestData<Packet>,
>({ packetClass, size, type, data, buffer }: TestPacketParams<Data, Packet>) {
  const packet = new packetClass(data);
  testInstructionPacketConstructor(packet, size, type, data);
  testInstructionPacketToBuffer(packet, buffer);
}

export function testInstructionPacketConstructor<
  Packet extends SendablePacket,
  Data extends PacketTestData<Packet>,
>(packet: Packet, expectedSize: number, expectedType: PacketType, data: Data) {
  it('should fill data from the constructor', () => {
    expect(packet.Size).toEqual(expectedSize);
    expect(packet.Type).toEqual(expectedType);
    Object.entries(data).forEach(([key, expectedValue]) => {
      const actualValue = packet[key as keyof Packet];
      try {
        expect(actualValue).toEqual(expectedValue);
      } catch {
        const diff = printDiffOrStringify(
          expectedValue,
          actualValue,
          'Expected',
          'Received',
          true,
        );
        throw new Error(`Unexpected value of property ${key}\n${diff}`);
      }
    });
  });
}

export function testInstructionPacketToBuffer<Packet extends SendablePacket>(
  packet: Packet,
  expectedBuffer: Uint8Array,
) {
  it('should pack data into a buffer', () => {
    const actualBuffer = packet.pack();
    expect(actualBuffer.length).toEqual(packet.Size);
    expect(actualBuffer).toEqual(expectedBuffer);
  });
}

export function stringToBytes(string: string) {
  return string.split('').map((char) => char.charCodeAt(0));
}
