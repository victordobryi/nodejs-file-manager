import { exit, stdin, stdout } from 'process';
import { getGreetingMsg } from './utils/getGreetingMsg.js';
import { getCurrentPathMsg } from './utils/getCurrentPathMsg.js';
import { up } from './operations/navigation/up.js';
import { cd } from './operations/navigation/cd.js';
import ReadLine from 'readline';
import { getByeMsg } from './utils/getByeMsg.js';
import { ls } from './operations/navigation/ls.js';

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
        case '.exit':
          stdout.write(getByeMsg(username));
          exit(0);
        default:
          stdout.write('Invalid Input\n');
          return;
      }
      stdout.write(getCurrentPathMsg());
    });

    readline.on('close', () => {
      stdout.write(getByeMsg(username));
      stdout.write(getCurrentPathMsg());
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
