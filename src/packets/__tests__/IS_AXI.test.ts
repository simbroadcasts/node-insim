import { stringToBytes } from '../../utils';
import { IS_AXI, PacketType } from '..';
import { AbstractPacket } from '../AbstractPacket';

const expectedBuffer = Buffer.from([
  40 / AbstractPacket.SIZE_MULTIPLIER, // Size
  43, // Type
  0, // ReqI
  0, // Zero
  2, // AXStart
  3, // NumCP
  23, // NumO (1)
  17, // NumO (2)
  ...stringToBytes('Lorem ipsum dolor sit amet, cons'),
]);

describe('IS_AXI', () => {
  it('should unpack data from a buffer', () => {
    const packet = new IS_AXI().unpack(expectedBuffer);

    expect(packet.Size).toEqual(40);
    expect(packet.Type).toEqual(PacketType.ISP_AXI);
    expect(packet.ReqI).toEqual(0);
    expect(packet.Zero).toEqual(0);
    expect(packet.AXStart).toEqual(2);
    expect(packet.NumCP).toEqual(3);
    expect(packet.NumO).toEqual(4375);
    expect(packet.LName).toEqual('Lorem ipsum dolor sit amet, cons');
  });
});
