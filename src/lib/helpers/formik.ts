import camelCase from 'camelcase';
import dayjs from 'dayjs';
import {FormikHelpers, FormikValues} from 'formik';

// lib
import {isDateKey} from './dates';

type SetFieldValue = Pick<
  FormikHelpers<FormikValues>,
  'setFieldValue'
>['setFieldValue'];

export function preloadFormValues<T, E>(
  values: T,
  initialValues: E,
  setFieldValue: SetFieldValue,
  isAcademic: boolean,
) {
  Object.entries(values).forEach(([key, value]) => {
    const keysArray = Object.keys(initialValues);
    const hasKeyInForm = keysArray.includes(camelCase(key));
    if (hasKeyInForm) {
      setFieldValue(
        camelCase(key),
        isDateKey(key, value)
          ? isAcademic
            ? `${dayjs(value).$y}`
            : `${dayjs(value).format('MM/YYYY')}`
          : value,
      );
      if (key === 'city') {
        setFieldValue('city', value.id);
      }
    }
  });
}

const parseApiErrors = (error: Error) => {
  const parsedError = JSON.parse(error.message);
  const errors = Object.entries(parsedError).reduce(
    (acc, [key, value]: [string, any]) => ({
      ...acc,
      [camelCase(key)]: value[0],
    }),
    {},
  );

  return errors;
};

export const injectErrorsFromBackend = <T>(
  submitFn: (values: T) => Promise<any>,
) => (values: T, {setErrors}: FormikHelpers<T>) =>
  submitFn(values).catch((error: any) => setErrors(parseApiErrors(error)));
