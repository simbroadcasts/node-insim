type TypedArray =
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array;

export const typedArraysAreEqual = (a: TypedArray, b: TypedArray) => {
  if (a.byteLength !== b.byteLength) {
    return false;
  }

  return a.every((val, i) => val === b[i]);
};
