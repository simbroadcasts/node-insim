import { ISendable } from '../packets';

export const checkPacketDataSize = (packet: ISendable) => {
  it('should have the correct size when packed', () => {
    const packedData = packet.pack();
    expect(packedData.length).toEqual(packet.Size);
  });
};
