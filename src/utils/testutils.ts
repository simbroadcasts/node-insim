import { IPacket } from '../packets';

export const checkPacketDataSize = (packet: IPacket) => {
  it('should have the correct size when packed', () => {
    const packedData = packet.pack();
    expect(packedData.length).toEqual(packet.Size);
  });
};
