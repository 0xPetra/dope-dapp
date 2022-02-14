export const isValidValue = (regex: string, value: string): boolean =>
  new RegExp(regex, 'g').test(value);
