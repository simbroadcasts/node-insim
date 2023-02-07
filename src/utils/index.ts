export * from './decorators';
export * from './lfspack';
export * from './log';

export type KeyOfType<T, V> = keyof {
  [P in keyof T as T[P] extends V ? P : never]: unknown;
};
