import { BasePacket } from '..';
import {
  byte,
  char,
  float,
  getFormat,
  int,
  short,
  unsigned,
  word,
} from '../decorators';
import { PacketType } from '../packetTypes';

describe('Packet property decorators', () => {
  it('should return the correct jspack char for each binary data type', () => {
    class TestPacket extends BasePacket {
      ReqI = 0;
      Size = 0;
      Type = PacketType.ISP_ISI;
      @char(1) Char = 'a';
      @char(3) String = 'abc';
      @byte() Byte = 255;
      @word() Word = 65535;
      @short() Short = -32767;
      @unsigned() Unsigned = 4294967295;
      @int() Int = -2147483648;
      @float() Float = 1.2e-38;
    }

    const packet = new TestPacket();

    expect(getFormat(packet, 'Char')).toEqual('c');
    expect(getFormat(packet, 'String')).toEqual('3s');
    expect(getFormat(packet, 'Byte')).toEqual('B');
    expect(getFormat(packet, 'Word')).toEqual('H');
    expect(getFormat(packet, 'Short')).toEqual('h');
    expect(getFormat(packet, 'Unsigned')).toEqual('L');
    expect(getFormat(packet, 'Int')).toEqual('l');
    expect(getFormat(packet, 'Float')).toEqual('f');
  });
});
