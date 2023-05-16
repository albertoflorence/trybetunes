export const min = (number) => (value) => value.length >= number;

export const validate = (...funcs) => (value) => funcs.every((func) => func(value));
