export const isDateKey = (key: string, value: unknown) =>
  /date/gi.test(key) && typeof value === 'string';
