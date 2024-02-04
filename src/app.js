import ReadLine from 'readline';
import { exit, stdin, stdout } from 'process';
import { getCurrentPathMsg, getByeMsg, getGreetingMsg, coloredLog } from './utils/index.js';
import { cd, ls, up } from './operations/navigation/index.js';
import { add, cat, cp, mv, rm, rn } from './operations/fs/index.js';
import { os } from './operations/os/index.js';
import { hash } from './operations/hash/index.js';
import { INVALID_INPUT } from './constants/index.js';
import { brotli } from './operations/zip/index.js';

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
          await brotli(otherArgs, 'compress');
          break;
        case 'decompress':
          await brotli(otherArgs, 'decompress');
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
