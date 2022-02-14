import {snakeCase} from 'snake-case';

type Object = {
  [key: string]: any;
};

export const keysToSnakeCase = (object: Object) =>
  Object.entries(object).reduce((acc, [key, value]) => {
    // FIXME: Problems wish Academic startDate/endDate
    // if (key.includes('Date')) {
    //   return {...acc, [snakeCase(key)]: value.format('YYYY-MM-DD')};
    // } else {
    return {...acc, [snakeCase(key)]: value};
    // }
  }, {});
