import { homedir } from 'os';
import { parseArgs, getValueByArg } from './src/utils/index.js';
import { USERNAME_ARG, USERNAME_NOT_FOUND } from './src/constants/index.js';
import { app } from './src/app.js';

try {
  const initialWorkingDirectory = homedir();
  process.chdir(initialWorkingDirectory);
  const args = parseArgs();
  const userName = getValueByArg(args, USERNAME_ARG);
  if (!userName) throw new Error(USERNAME_NOT_FOUND);
  app(userName);
} catch (error) {
  throw new Error(error.message);
}
