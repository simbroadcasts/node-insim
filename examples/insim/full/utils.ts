export function getStringEnumValues<T extends Record<number, string>>(
  enumVar: T,
): (keyof T)[] {
  return (Object.keys(enumVar) as unknown as number[]).filter(
    (key) => !isNaN(Number(enumVar[key])),
  );
}
