import { coloredLog } from '../../utils/getColoredLog.js';
import fs from 'fs';
import fsProm from 'fs/promises';
import crypto from 'crypto';
import { DIR_NOT_FILE } from '../../constants/index.js';

export const hash = async (filePath) => {
  try {
    const stats = await fsProm.stat(filePath);
    const isExist = stats.isDirectory();

    if (!isExist) {
      const readStream = fs.createReadStream(filePath);

      const hash = crypto.createHash('sha256');

      readStream.pipe(hash).on('finish', () => {
        console.log(`Hash value : ${hash.digest('hex')}`);
      });
    } else {
      throw new Error(DIR_NOT_FILE);
    }
  } catch (error) {
    coloredLog(error.message, 'red');
  }
};
