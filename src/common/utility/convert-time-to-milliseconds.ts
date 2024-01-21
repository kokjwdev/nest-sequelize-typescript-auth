// convert-time-to-milliseconds.ts

export function convertTimeToMilliseconds(time: string): number {
  const regex = /(\d+)([hms])/;
  const matches = time.match(regex);

  if (!matches) {
    throw new Error('Invalid time format');
  }

  const value = Number(matches[1]);
  const unit = matches[2];

  switch (unit) {
    case 'h': // hours
      return value * 60 * 60 * 1000;
    case 'm': // minutes
      return value * 60 * 1000;
    case 's': // seconds
      return value * 1000;
    default:
      throw new Error('Invalid time unit');
  }
}
