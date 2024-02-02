import { stdin, stdout, exit } from 'process';
import { getGreetingMsg } from './utils/getGreetingMsg.js';
import { getCurrentPathMsg } from './utils/getCurrentPathMsg.js';
import { up } from './operations/navigation/up.js';

process.on('message', (message) => {
  if (message.type === 'welcome') {
    stdout.write(`${getGreetingMsg(message.userName)}${getCurrentPathMsg()}`);
  }
});

export const app = (chunk) => {
  try {
    const chunkStringified = chunk.toString();
    const formatedChunk = chunkStringified.trim();
    switch (formatedChunk) {
      case 'up':
        up();
        break;
      default:
        stdout.write('Invalid Input\n');
        break;
    }
    if (chunkStringified.includes('.exit')) exit(0);
    stdout.write(getCurrentPathMsg());
  } catch (error) {
    throw new Error(error.message);
  }
};

stdin.on('data', app);
