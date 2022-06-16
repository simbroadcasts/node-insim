import { stringToBytes } from '../../utils';
import { BasePacket, PacketType } from '..';
import { byte, char } from '../decorators';

describe('BasePacket', () => {
  describe('initialize', () => {
    it('should populate instance properties using initialize()', () => {
      class CustomPacket extends BasePacket {
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
      class CustomPacket extends BasePacket {
        @byte() Size = 0;
        @byte() Type = PacketType.ISP_ISI;
        @byte() ReqI = 1;
        @char(6) StringProperty = 'string';
        @byte() NumberProperty = 0;

        constructor(data?: Buffer) {
          super();
          this.initialize(data);
        }
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
      const packet = new CustomPacket(buffer);

      expect(packet.Size).toEqual(8);
      expect(packet.Type).toEqual(PacketType.ISP_NCN);
      expect(packet.ReqI).toEqual(2);
    });
  });

  describe('getValidPropertyNames', () => {
    it('should return an empty array if no properties are annotated', () => {
      class CustomPacket extends BasePacket {
        Size = 2;
        Type = PacketType.ISP_ISI;
        ReqI = 1;
        StringProperty = 'string';

        public getValidPropertyNames() {
          return super.getValidPropertyNames();
        }
      }

      const packet = new CustomPacket();

      expect(packet.getValidPropertyNames()).toEqual([]);
    });

    it('should return list of annotated properties', () => {
      class CustomPacket extends BasePacket {
        @byte() Size = 2;
        @byte() Type = PacketType.ISP_ISI;
        @byte() ReqI = 1;
        @char(6) StringProperty = 'string';
        @byte() NumberProperty = 0;
        InvalidProperty = 'invalid';

        public getValidPropertyNames() {
          return super.getValidPropertyNames();
        }
      }

      const packet = new CustomPacket();

      expect(packet.getValidPropertyNames()).toEqual([
        'Size',
        'Type',
        'ReqI',
        'StringProperty',
        'NumberProperty',
      ]);
    });
  });

  describe('getFormat', () => {
    it('should return the jspack format of all valid properties', () => {
      class CustomPacket extends BasePacket {
        @byte() Size = 2;
        @byte() Type = PacketType.ISP_ISI;
        @byte() ReqI = 1;
        @char(6) StringProperty = 'string';
        @byte() NumberProperty = 0;
        InvalidProperty = 'invalid';

        public getFormat() {
          return super.getFormat();
        }
      }

      const packet = new CustomPacket();

      expect(packet.getFormat()).toEqual('<BBB6sB');
    });

    it('should override property format if provided', () => {
      class CustomPacket extends BasePacket {
        @byte() Size = 2;
        @byte() Type = PacketType.ISP_ISI;
        @byte() ReqI = 1;
        @char(6) StringProperty = 'string';
        @byte() NumberProperty = 0;
        InvalidProperty = 'invalid';

        public getFormat() {
          return super.getFormat({
            NumberProperty: 'C',
          });
        }
      }

      const packet = new CustomPacket();

      expect(packet.getFormat()).toEqual('<BBB6sC');
    });
  });
});
