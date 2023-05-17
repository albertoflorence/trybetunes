import { min, validateObject } from './funcs';

const MIN_LENGTH = 3;

const editUserValidateObject = {
  name: min(MIN_LENGTH),
  email: min(MIN_LENGTH),
  description: min(MIN_LENGTH),
  image: min(MIN_LENGTH),
};

export const editUserValidate = validateObject(editUserValidateObject);
