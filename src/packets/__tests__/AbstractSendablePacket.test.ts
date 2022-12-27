import { byte, string } from '../../utils';
import { stringToBytes } from '../../utils/tests';
import { PacketType } from '..';
import { AbstractSendablePacket } from '../base';

describe('AbstractSendablePacket', () => {
  describe('initialize', () => {
    it('should populate instance properties using initialize()', () => {
      class CustomPacket extends AbstractSendablePacket {
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
      class CustomPacket extends AbstractSendablePacket {
        @byte() Size = 0;
        @byte() Type = PacketType.ISP_ISI;
        @byte() ReqI = 1;
        @string(6) StringProperty = 'string';
        @byte() NumberProperty = 0;
      }

      const buffer = Buffer.from([
        8 / AbstractSendablePacket.SIZE_MULTIPLIER, // Size
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
      expect(packet.StringProperty).toEqual('test');
      expect(packet.NumberProperty).toEqual(25);
    });
  });
});
