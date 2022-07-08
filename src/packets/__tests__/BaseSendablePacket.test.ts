import { byte, char, stringToBytes } from '../../utils';
import { BasePacket, BaseSendablePacket, PacketType } from '..';

describe('BasePacket', () => {
  describe('initialize', () => {
    it('should populate instance properties using initialize()', () => {
      class CustomPacket extends BaseSendablePacket {
        Size = 2;
        Type = PacketType.ISP_ISI;
        ReqI = 1;
        StringProperty = 'old';
        NumberProperty = 0;

        constructor(data?: Record<string, unknown>) {
          super();
          this.initialize(data);
        }
      }

      const packet = new CustomPacket({
        StringProperty: 'new',
        NumberProperty: 2,
      });

      expect(packet.StringProperty).toEqual('new');
      expect(packet.NumberProperty).toEqual(2);
    });

    it('should unpack binary data', () => {
      class CustomPacket extends BaseSendablePacket {
        @byte() Size = 0;
        @byte() Type = PacketType.ISP_ISI;
        @byte() ReqI = 1;
        @char(6) StringProperty = 'string';
        @byte() NumberProperty = 0;
      }

      const buffer = Buffer.from([
        8 / BasePacket.SIZE_MULTIPLIER, // Size
        PacketType.ISP_NCN, // Type
        2, // ReqI
        ...stringToBytes('test'), // StringProperty[6]
        0,
        0,
        25, // NumberProperty
      ]);
      const packet = new CustomPacket().unpack(buffer);

      expect(packet.Size).toEqual(8);
      expect(packet.Type).toEqual(PacketType.ISP_NCN);
      expect(packet.ReqI).toEqual(2);
    });
  });
});
