import { parseArgs } from './src/utils/parseArgs.js';
import { getValueByArg } from './src/utils/getValueByArg.js';
import { USERNAME_ARG, USERNAME_NOT_FOUND } from './src/constants/index.js';
import { getAbsPath } from './src/utils/getAbsPath.js';
import { fork } from 'child_process';
import { getByeMsg } from './src/utils/getByeMsg.js';
import { getCurrentPathMsg } from './src/utils/getCurrentPathMsg.js';
import { getHomeDir } from './src/utils/getHomeDir.js';

try {
  const initialWorkingDirectory = getHomeDir();
  process.chdir(initialWorkingDirectory);
  const appIteratorPath = getAbsPath(import.meta.url, './src/app.js');
  const args = parseArgs();
  const userName = getValueByArg(args, USERNAME_ARG);
  if (!userName) throw new Error(USERNAME_NOT_FOUND);

  const cp = fork(appIteratorPath, null);
  cp.send({ type: 'welcome', userName });

  cp.on('close', () => {
    console.log(getByeMsg(userName));
    console.log(getCurrentPathMsg());
  });

  process.on('SIGINT', () => {
    console.log(getByeMsg(userName));
    console.log(getCurrentPathMsg());
    process.exit(0);
  });
} catch (error) {
  throw new Error(error.message);
}
