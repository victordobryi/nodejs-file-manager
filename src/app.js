import { exit, stdin, stdout } from 'process';
import { getGreetingMsg } from './utils/getGreetingMsg.js';
import { getCurrentPathMsg } from './utils/getCurrentPathMsg.js';
import { up } from './operations/navigation/up.js';
import { cd } from './operations/navigation/cd.js';
import ReadLine from 'readline';
import { getByeMsg } from './utils/getByeMsg.js';
import { ls } from './operations/navigation/ls.js';
import { cat } from './operations/fs/cat.js';
import { INVALID_INPUT } from './constants/index.js';
import { add } from './operations/fs/add.js';
import { rn } from './operations/fs/rn.js';
import { cp } from './operations/fs/cp.js';
import { mv } from './operations/fs/mv.js';
import { rm } from './operations/fs/rm.js';
import { os } from './operations/os/index.js';
import { hash } from './operations/hash/index.js';
import { compress } from './operations/zip/compress.js';
import { decompress } from './operations/zip/decompress.js';

export const readline = ReadLine.createInterface({
  input: stdin,
  output: stdout,
});

export const app = async (username) => {
  if (readline) {
    stdout.write(`${getGreetingMsg(username)}${getCurrentPathMsg()}`);
  }
  try {
    readline.on('line', async (line) => {
      const command = line.split(' ')[0];
      const otherArgs = line.split(' ').slice(1).join(' ');
      switch (command) {
        case 'up':
          up();
          break;
        case 'cd':
          cd(otherArgs);
          break;
        case 'ls':
          await ls();
          break;
        case 'cat':
          await cat(otherArgs);
          break;
        case 'add':
          await add(otherArgs);
          break;
        case 'rn':
          await rn(otherArgs);
          break;
        case 'cp':
          await cp(otherArgs);
          break;
        case 'mv':
          await mv(otherArgs);
          break;
        case 'rm':
          await rm(otherArgs);
          break;
        case 'os':
          await os(otherArgs);
          break;
        case 'hash':
          await hash(otherArgs);
          break;
        case 'compress':
          await compress(otherArgs);
          break;
        case 'decompress':
          await decompress(otherArgs);
          break;
        case '.exit':
          stdout.write(getByeMsg(username));
          exit(0);
        default:
          stdout.write(INVALID_INPUT);
          stdout.write(getCurrentPathMsg());
          return;
      }
      stdout.write(getCurrentPathMsg());
    });
    readline.on('close', () => {
      stdout.write(getByeMsg(username));
    });
  } catch (error) {
    coloredLog(error.message, 'red');
  }
};
