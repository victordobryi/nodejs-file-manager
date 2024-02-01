import { stdin, stdout, exit } from 'process';

process.on('message', (message) => {
  if (message.type === 'welcome') {
    console.log(`Welcome to the File Manager, ${message.userName}!`);
  }
});

export const app = (chunk) => {
  try {
    const chunkStringified = chunk.toString();
    if (chunkStringified.includes('.exit')) exit(0);
    stdout.write(`Received from master process: ${chunk}\n`);
  } catch (error) {
    throw new Error(error.message);
  }
};

stdin.on('data', app);
