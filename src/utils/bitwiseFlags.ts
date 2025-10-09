export function isFlagOn<TProperty extends number>(
  property: TProperty,
  flag: Exclude<TProperty, 0>,
) {
  return (property & flag) !== 0;
}
