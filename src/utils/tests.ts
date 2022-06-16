import type { ISendable } from '../packets';

export function checkPacketDataSize(packet: ISendable) {
  it('should have the correct size when packed', () => {
    const packedData = packet.pack();
    expect(packedData.length).toEqual(packet.Size);
  });
}

export function stringToBytes(string: string) {
  return string.split('').map((char) => char.charCodeAt(0));
}
