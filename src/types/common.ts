export type PartialExcept<T, Required extends keyof T> = Partial<
  Omit<T, Required>
> &
  Pick<T, Required>;
