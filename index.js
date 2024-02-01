import { parseArgs } from './src/utils/parseArgs.js';
import { getValueByArg } from './src/utils/getValueByArg.js';
import { USERNAME_ARG, USERNAME_NOT_FOUND } from './src/constants/index.js';
import { getAbsPath } from './src/utils/getAbsPath.js';
import { fork } from 'child_process';
import { getByeMsg } from './src/utils/getByeMsg.js';

try {
  const appIteratorPath = getAbsPath(import.meta.url, './src/app.js');
  const args = parseArgs();
  const userName = getValueByArg(args, USERNAME_ARG);
  if (!userName) throw new Error(USERNAME_NOT_FOUND);

  const cp = fork(appIteratorPath, null);
  cp.send({ type: 'welcome', userName });

  cp.on('close', () => {
    console.log(getByeMsg(userName));
  });

  process.on('SIGINT', () => {
    console.log(getByeMsg(userName));
    process.exit(0);
  });
} catch (error) {
  throw new Error(error.message);
}
