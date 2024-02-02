import { exit, stdin, stdout } from 'process';
import { getGreetingMsg } from './utils/getGreetingMsg.js';
import { getCurrentPathMsg } from './utils/getCurrentPathMsg.js';
import { up } from './operations/navigation/up.js';
import { cd } from './operations/navigation/cd.js';
import ReadLine from 'readline';
import { getByeMsg } from './utils/getByeMsg.js';

export const readline = ReadLine.createInterface({
  input: stdin,
  output: stdout,
});

export const app = async (username) => {
  if (readline) {
    stdout.write(`${getGreetingMsg(username)}${getCurrentPathMsg()}`);
  }
  try {
    readline.on('line', (line) => {
      const command = line.split(' ')[0];
      const otherArgs = line.split(' ').slice(1).join(' ');
      switch (command) {
        case 'up':
          up();
          stdout.write(getCurrentPathMsg());
          break;
        case 'cd':
          cd(otherArgs);
          stdout.write(getCurrentPathMsg());
          break;
        case '.exit':
          stdout.write(getByeMsg(username));
          exit(0);
        default:
          stdout.write('Invalid Input\n');
          break;
      }
    });

    readline.on('close', () => {
      stdout.write(getByeMsg(username));
      stdout.write(getCurrentPathMsg());
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
