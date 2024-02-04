import { VALUES_NOT_FOUND } from '../constants/index.js';

export const getValueByArg = (args, name) => {
  try {
    const arg = args.find((arg) => arg.startsWith(name));
    const value = arg.split('=')[1];
    return value;
  } catch (error) {
    console.log(VALUES_NOT_FOUND);
  }
};
