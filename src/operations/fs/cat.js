import fs from 'fs';
import { stdout } from 'process';
import { coloredLog } from '../../utils/getColoredLog.js';
import { FILE_NOT_FOUND } from '../../constants/index.js';
import { getCurrentPathMsg } from '../../utils/getCurrentPathMsg.js';

export const cat = async (path) => {
  try {
    const fileStream = fs.createReadStream(path);
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
