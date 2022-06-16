export function getStringEnumValues<T extends Record<number, string>>(
  enumVar: T,
): (keyof T)[] {
  return (Object.keys(enumVar) as unknown as number[]).filter(
    (key) => !isNaN(Number(enumVar[key])),
  );
}

export function lfsRaceLapsToLapsOrHours(raceLaps: number): string {
  if (raceLaps === 0) {
    return 'practice';
  }

  if (raceLaps >= 1 && raceLaps <= 99) {
    const lapsUnit = getLapsUnit(raceLaps);
    return `${raceLaps} ${lapsUnit}`;
  }

  if (raceLaps >= 100 && raceLaps <= 190) {
    return `${(raceLaps - 100) * 10 + 100} laps`;
  }

  if (raceLaps >= 191 && raceLaps <= 238) {
    const hours = raceLaps - 190;
    const hoursUnit = getHoursUnit(hours);
    return `${hours} ${hoursUnit}`;
  }

  return `${raceLaps} laps`;
}

function getLapsUnit(laps: number) {
  return laps === 1 ? 'lap' : 'laps';
}

function getHoursUnit(hours: number) {
  return hours === 1 ? 'hour' : 'hours';
}
