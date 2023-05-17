export const min = (number) => (value) => typeof value === 'string'
  && value.length >= number;

export const validate = (...funcs) => (value) => funcs.every((func) => func(value));

export const validateObject = (object) => (input) => Object
  .entries(object).every(([key, func]) => validate(...[].concat(func))(input[key]));
