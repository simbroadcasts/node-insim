import { checkPacketDataSize } from '../../utils';
import type { IS_SCC_Data } from '..';
import { IS_SCC, PacketType, ViewIdentifier } from '..';
import { BasePacket } from '../BasePacket';

describe('IS_SCC', () => {
  checkPacketDataSize(new IS_SCC());

  it('should fill data from the constructor', () => {
    const data: IS_SCC_Data = {
      ViewPLID: 1,
      InGameCam: ViewIdentifier.VIEW_DRIVER,
    };
    const packet = new IS_SCC(data);

    expect(packet.ReqI).toEqual(0);
    expect(packet.Zero).toEqual(0);
    expect(packet.ViewPLID).toEqual(1);
    expect(packet.InGameCam).toEqual(ViewIdentifier.VIEW_DRIVER);
    expect(packet.Sp2).toEqual(0);
    expect(packet.Sp3).toEqual(0);
  });

  it('should pack data into a buffer', () => {
    const data: IS_SCC_Data = {
      ViewPLID: 1,
      InGameCam: ViewIdentifier.VIEW_DRIVER,
    };
    const expectedBuffer = Buffer.from([
      8 / BasePacket.SIZE_MULTIPLIER, // Size
      PacketType.ISP_SCC, // Type
      0, // ReqI
      0, // Zero
      1, // ViewPLID
      ViewIdentifier.VIEW_DRIVER, // InGameCam
      0, // Sp2
      0, // Sp3
    ]);
    const actualBuffer = new IS_SCC(data).pack();

    expect(actualBuffer).toEqual(expectedBuffer);
  });
});
