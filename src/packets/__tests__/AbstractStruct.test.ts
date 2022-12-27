import { byte, char } from '../../utils';
import { PacketType } from '../';
import { AbstractStruct } from '../AbstractStruct';

describe('AbstractStruct', () => {
  describe('getValidPropertyNames', () => {
    it('should return an empty array if no properties are annotated', () => {
      class CustomPacket extends AbstractStruct {
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
      class CustomPacket extends AbstractStruct {
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
      class CustomPacket extends AbstractStruct {
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
      class CustomPacket extends AbstractStruct {
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
