import 'reflect-metadata';

const formatMetadataKey = Symbol('format');

/** String of 1-byte characters */
export function string(count: number) {
  return Reflect.metadata(formatMetadataKey, count === 1 ? 'c' : `${count}s`);
}

/** 1-byte signed integer */
export function char() {
  return Reflect.metadata(formatMetadataKey, 'b');
}

/** 1-byte unsigned integer */
export function byte() {
  return Reflect.metadata(formatMetadataKey, 'B');
}

/** Array of bytes */
export function byteArray(count: number) {
  return Reflect.metadata(formatMetadataKey, `${count}A`);
}

/** 2-byte unsigned integer */
export function word() {
  return Reflect.metadata(formatMetadataKey, 'H');
}

/** 2-byte signed integer */
export function short() {
  return Reflect.metadata(formatMetadataKey, 'h');
}

/** 4-byte unsigned integer */
export function unsigned() {
  return Reflect.metadata(formatMetadataKey, 'L');
}

/** 4-byte signed integer */
export function int() {
  return Reflect.metadata(formatMetadataKey, 'l');
}

/** 4-byte float */
export function float() {
  return Reflect.metadata(formatMetadataKey, 'f');
}

/** 8-byte double */
export function double() {
  return Reflect.metadata(formatMetadataKey, 'd');
}

/** 12-byte vector of 3 floats */
export function Vector() {
  return Reflect.metadata(formatMetadataKey, 'fff');
}

/** 12-byte vector of 3 ints */
export function Vec() {
  return Reflect.metadata(formatMetadataKey, 'lll');
}

/** Array */
export function array<S extends { new (): { getFormat: () => string } }>(
    str: S, cnt: number
) {
  const format = new str().getFormat();
  let res = [];
  for (let i = 0; i < cnt; i++) {
    res.push(format);
  }
  return Reflect.metadata(formatMetadataKey, res.join(''))
} 

/** Struct */
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
 **/
export function carName() {
  return Reflect.metadata(formatMetadataKey, 'C');
}

export function getFormat<T extends object>(target: T, propertyKey: string) {
  return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}
