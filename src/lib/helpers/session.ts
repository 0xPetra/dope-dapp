import {isValidValue} from './regex';

type ValidationStatus = 'valid' | 'error' | 'normal';

export const getValidationStatus = (
  regex: string,
  value: string,
  error: string | undefined,
  submitCount: number,
): ValidationStatus => {
  const isValid = isValidValue(regex, value);

  if (isValid) {
    return 'valid';
  }
  if (error && submitCount && !isValid) {
    return 'error';
  }

  return 'normal';
};

export const getMatchValidationStatus = (
  valueOne: string,
  valueTwo: string,
  errorOne: string | undefined,
  errorTwo: string | undefined,
  submitCount: number,
): ValidationStatus => {
  if (!errorOne && !errorTwo && valueOne && valueTwo) {
    return 'valid';
  }
  if (errorTwo && submitCount) {
    return 'error';
  }

  return 'normal';
};
