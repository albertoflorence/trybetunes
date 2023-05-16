import { min, validate } from './funcs';

const MIN_LENGTH = 2;

export const searchValidate = validate(min(MIN_LENGTH));
