import 'reflect-metadata';

const formatMetadataKey = Symbol('format');

/**
 * String of 1-byte characters
 * @internal
 */
export function string(count: number) {
  return Reflect.metadata(formatMetadataKey, count === 1 ? 'c' : `${count}s`);
}

/**
 * String of 1-byte characters ending with a NULL byte
 * @internal
 */
export function stringNull(count: number) {
  return Reflect.metadata(formatMetadataKey, `${count}S`);
}

/**
 * 1-byte signed integer
 * @internal
 */
export function char() {
  return Reflect.metadata(formatMetadataKey, 'b');
}

/**
 * 1-byte unsigned integer
 * @internal
 */
export function byte() {
  return Reflect.metadata(formatMetadataKey, 'B');
}

/**
 * Array of bytes
 * @internal
 */
export function byteArray(count: number) {
  return Reflect.metadata(formatMetadataKey, `${count}A`);
}

/**
 * 2-byte unsigned integer
 * @internal
 */
export function word() {
  return Reflect.metadata(formatMetadataKey, 'H');
}

/**
 * 2-byte signed integer
 * @internal
 */
export function short() {
  return Reflect.metadata(formatMetadataKey, 'h');
}

/**
 * 4-byte unsigned integer
 * @internal
 */
export function unsigned() {
  return Reflect.metadata(formatMetadataKey, 'L');
}

/**
 * 4-byte signed integer
 * @internal
 */
export function int() {
  return Reflect.metadata(formatMetadataKey, 'l');
}

/**
 * 4-byte float
 * @internal
 */
export function float() {
  return Reflect.metadata(formatMetadataKey, 'f');
}

/**
 * 8-byte double
 * @internal
 */
export function double() {
  return Reflect.metadata(formatMetadataKey, 'd');
}

/**
 * 12-byte vector of 3 floats
 * @internal
 */
export function Vector() {
  return Reflect.metadata(formatMetadataKey, 'fff');
}

/**
 * 12-byte vector of 3 ints
 * @internal
 */
export function Vec() {
  return Reflect.metadata(formatMetadataKey, 'lll');
}

/**
 * Array
 * @internal
 */
export function array<S extends { new (): { getFormat: () => string } }>(
  str: S,
  cnt: number,
) {
  const format = new str().getFormat();
  const res = [];
  for (let i = 0; i < cnt; i++) {
    res.push(format);
  }
  return Reflect.metadata(formatMetadataKey, res.join(''));
}

/**
 * Struct
 * @internal
 */
export function struct<S extends { new (): { getFormat: () => string } }>(
  str: S,
) {
  return Reflect.metadata(formatMetadataKey, new str().getFormat());
}

/**
 * LFS car name
 *
 * The value can be one of these:
 * - a 3-character abbreviation of an official LFS car (e.g. XRT)
 * - a hexadecimal string representation of a car mod's SkinID (e.g. 5882E6)
 *
 * @internal
 */
export function carName() {
  return Reflect.metadata(formatMetadataKey, 'C');
}

/** @internal */
export function getFormat<T extends object>(target: T, propertyKey: string) {
  return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}
