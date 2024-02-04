import { createReadStream } from 'fs';
import { stdout } from 'process';
import { coloredLog, getCurrentPathMsg } from '../../utils/index.js';
import { FILE_NOT_FOUND } from '../../constants/index.js';

export const cat = async (path) => {
  try {
    const fileStream = createReadStream(path);
    fileStream.on('end', () => {
      stdout.write(getCurrentPathMsg());
    });
    fileStream.on('error', () => {
      coloredLog(FILE_NOT_FOUND, 'red');
    });
    fileStream.pipe(stdout);
  } catch (error) {
    coloredLog(FILE_NOT_FOUND, 'red');
  }
};
