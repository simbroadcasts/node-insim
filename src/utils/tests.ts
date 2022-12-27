import type { ISendable } from '../packets';
import type { PacketType } from '../packets';

export function testSendablePacket<
  Packet extends ISendable,
  Data extends Record<string, unknown>,
>(
  packetConstructor: { new (data?: Data): Packet },
  expectedSize: number,
  expectedType: PacketType,
  testData: Data,
  expectedBuffer: Buffer,
) {
  testSendablePacketSize(new packetConstructor(testData));
  testSendablePacketConstructor(
    packetConstructor,
    expectedSize,
    expectedType,
    testData,
  );
  testSendablePacketToBuffer(packetConstructor, testData, expectedBuffer);
}

export function testSendablePacketSize(packet: ISendable) {
  it('should have the correct size when packed', () => {
    const packedData = packet.pack();
    expect(packedData.length).toEqual(packet.Size);
  });
}

export function testSendablePacketConstructor<
  Packet extends ISendable,
  Data extends Record<string, unknown>,
>(
  packetConstructor: new (data?: Data) => Packet,
  size: number,
  type: PacketType,
  data: Data,
) {
  it('should fill data from the constructor', () => {
    const packet = new packetConstructor(data);
    expect(packet.Size).toEqual(size);
    expect(packet.Type).toEqual(type);
    Object.entries(data).forEach(([key, value]) => {
      expect(packet[key as keyof ISendable]).toEqual(value);
    });
  });
}

export function testSendablePacketToBuffer<
  Packet extends ISendable,
  Data extends Record<string, unknown>,
>(
  packetConstructor: new (data?: Data) => Packet,
  data: Data,
  expectedBuffer: Buffer,
) {
  it('should pack data into a buffer', () => {
    const actualBuffer = new packetConstructor(data).pack();
    expect(actualBuffer).toEqual(expectedBuffer);
  });
}

export function stringToBytes(string: string) {
  return string.split('').map((char) => char.charCodeAt(0));
}
