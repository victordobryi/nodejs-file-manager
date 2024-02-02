import { stdin, stdout, exit } from 'process';
import { getGreetingMsg } from './utils/getGreetingMsg.js';
import { getCurrentPathMsg } from './utils/getCurrentPathMsg.js';

process.on('message', (message) => {
  if (message.type === 'welcome') {
    stdout.write(`${getGreetingMsg(message.userName)}${getCurrentPathMsg()}`);
  }
});

export const app = (chunk) => {
  try {
    const chunkStringified = chunk.toString();
    const formatedChunk = chunkStringified.trim();
    console.log(formatedChunk);
    switch (formatedChunk) {
      case 'Accept':
        console.log('Correct operation');
        break;
      default:
        stdout.write('Invalid Input\n');
        break;
    }
    if (chunkStringified.includes('.exit')) exit(0);
    stdout.write(`Received from master process: ${chunk}${getCurrentPathMsg()}`);
  } catch (error) {
    throw new Error(error.message);
  }
};

stdin.on('data', app);
