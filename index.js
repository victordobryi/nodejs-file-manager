import { parseArgs } from './src/utils/parseArgs.js';
import { getValueByArg } from './src/utils/getValueByArg.js';
import { USERNAME_ARG, USERNAME_NOT_FOUND } from './src/constants/index.js';
import { getHomeDir } from './src/utils/getHomeDir.js';
import { app } from './src/app.js';

try {
  const initialWorkingDirectory = getHomeDir();
  process.chdir(initialWorkingDirectory);
  const args = parseArgs();
  const userName = getValueByArg(args, USERNAME_ARG);
  if (!userName) throw new Error(USERNAME_NOT_FOUND);

  app(userName);
} catch (error) {
  throw new Error(error.message);
}
