import { printDiffOrStringify } from 'jest-matcher-utils';

import type { IPacket, ISendablePacket } from '../packets';
import type { PacketType } from '../packets';
import type { AbstractSendablePacket } from '../packets/AbstractSendablePacket';

type CommonPacketPropsWithoutReqI = Exclude<
  keyof AbstractSendablePacket,
  'ReqI'
>;

export type PacketTestData<Packet extends IPacket> = Partial<
  Omit<Packet, CommonPacketPropsWithoutReqI>
>;

type TestPacketParams<
  Data extends PacketTestData<Packet>,
  Packet extends IPacket,
> = {
  packetClass: { new (data?: Data): Packet };
  size: number;
  type: PacketType;
  data: Data;
  buffer: Buffer;
};

export function testBothWaysPacket<
  Packet extends ISendablePacket,
  Data extends PacketTestData<Packet>,
>(params: TestPacketParams<Data, Packet>) {
  testInfoPacket(params);
  testInstructionPacket(params);
}

export function testInfoPacket<
  Packet extends IPacket,
  Data extends PacketTestData<Packet>,
>({ packetClass, size, type, data, buffer }: TestPacketParams<Data, Packet>) {
  it('should unpack data from a buffer into a packet instance', () => {
    const packet = new packetClass().unpack(buffer);

    Object.entries(data).forEach(([key, expectedValue]) => {
      const actualValue = packet[key as keyof IPacket];
      try {
        expect(actualValue).toEqual(expectedValue);
      } catch (e) {
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
  Packet extends ISendablePacket,
  Data extends PacketTestData<Packet>,
>({ packetClass, size, type, data, buffer }: TestPacketParams<Data, Packet>) {
  const packet = new packetClass(data);
  testSendablePacketConstructor(packet, size, type, data);
  testSendablePacketToBuffer(packet, buffer);
}

export function testSendablePacketConstructor<
  Packet extends ISendablePacket,
  Data extends PacketTestData<Packet>,
>(packet: Packet, expectedSize: number, expectedType: PacketType, data: Data) {
  it('should fill data from the constructor', () => {
    expect(packet.Size).toEqual(expectedSize);
    expect(packet.Type).toEqual(expectedType);
    Object.entries(data).forEach(([key, expectedValue]) => {
      const actualValue = packet[key as keyof IPacket];
      try {
        expect(actualValue).toEqual(expectedValue);
      } catch (e) {
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

export function testSendablePacketToBuffer<Packet extends ISendablePacket>(
  packet: Packet,
  expectedBuffer: Buffer,
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
