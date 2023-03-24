import {
  byte,
  byteArray,
  float,
  getFormat,
  int,
  short,
  string,
  unsigned,
  word,
} from '../decorators';

describe('Class property decorators', () => {
  it('should return the correct jspack char for each binary data type', () => {
    class TestClass {
      @string(1) Char = 'a';
      @string(3) String = 'abc';
      @byte() Byte = 255;
      @byteArray(5) ByteArray = [34, 67, 255, 0, 5];
      @word() Word = 65535;
      @short() Short = -32767;
      @unsigned() Unsigned = 4294967295;
      @int() Int = -2147483648;
      @float() Float = 1.2e-38;
    }

    const packet = new TestClass();

    expect(getFormat(packet, 'Char')).toEqual('c');
    expect(getFormat(packet, 'String')).toEqual('3s');
    expect(getFormat(packet, 'Byte')).toEqual('B');
    expect(getFormat(packet, 'ByteArray')).toEqual('5A');
    expect(getFormat(packet, 'Word')).toEqual('H');
    expect(getFormat(packet, 'Short')).toEqual('h');
    expect(getFormat(packet, 'Unsigned')).toEqual('L');
    expect(getFormat(packet, 'Int')).toEqual('l');
    expect(getFormat(packet, 'Float')).toEqual('f');
  });
});
