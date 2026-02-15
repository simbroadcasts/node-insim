import { ipToUnsignedInteger, isValidIPv4 } from './ip';

describe('IP', () => {
  describe('isValidIPv4', () => {
    it('should return true for valid IPv4', () => {
      expect(isValidIPv4('0.0.0.0')).toBe(true);
      expect(isValidIPv4('127.0.0.1')).toBe(true);
      expect(isValidIPv4('89.207.132.170')).toBe(true);
    });

    it('should return false for no separators', () => {
      expect(isValidIPv4('1234')).toBe(false);
    });

    it('should return false for an empty string', () => {
      expect(isValidIPv4('')).toBe(false);
    });

    it('should return false for too many parts', () => {
      expect(isValidIPv4('1.2.3.4.5')).toBe(false);
    });

    it('should return false for too big numbers', () => {
      expect(isValidIPv4('1.2.3.4.5678')).toBe(false);
      expect(isValidIPv4('256.1.1.1')).toBe(false);
      expect(isValidIPv4('1.256.1.1')).toBe(false);
      expect(isValidIPv4('1.1.256.1')).toBe(false);
      expect(isValidIPv4('1.1.1.256')).toBe(false);
    });
  });

  describe('ipToUnsignedInteger', () => {
    it('should return an unsigned integer for valid IPv4 strings', () => {
      expect(ipToUnsignedInteger('0.0.0.0')).toBe(0);
      expect(ipToUnsignedInteger('0.0.0.1')).toBe(1);
      expect(ipToUnsignedInteger('127.0.0.1')).toBe(2130706433);
      expect(ipToUnsignedInteger('89.207.132.170')).toBe(1506772138);
    });

    it('should accept a single number', () => {
      expect(ipToUnsignedInteger('1')).toBe(1);
    });

    it('should return null for an empty string', () => {
      expect(ipToUnsignedInteger('')).toBe(null);
    });

    it('should return null for dots', () => {
      expect(ipToUnsignedInteger('...')).toBe(null);
    });

    it('should return null for a non-numeric parts', () => {
      expect(ipToUnsignedInteger('a.b.c.d')).toBe(null);
    });
  });
});
