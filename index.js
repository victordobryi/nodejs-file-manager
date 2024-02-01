import { parseArgs } from './src/utils/args.js';
import { getValueByArg } from './src/utils/getValueByArg.js';
import { USERNAME_ARG, USERNAME_NOT_FOUND } from './src/constants/index.js';

try {
  const args = parseArgs();
  const userName = getValueByArg(args, USERNAME_ARG);
  if (!userName) throw new Error(USERNAME_NOT_FOUND);
  console.log(`Welcome to the File Manager, ${userName}!`);
} catch (error) {
  throw new Error(error.message);
}
