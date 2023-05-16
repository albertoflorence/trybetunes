import { min, validate } from './funcs';

const MIN_LENGTH = 3;

export const loginValidate = validate(min(MIN_LENGTH));
