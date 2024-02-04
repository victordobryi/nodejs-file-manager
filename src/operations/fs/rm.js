import fs from 'fs/promises';
import { FILE_NOT_FOUND } from '../../constants/index.js';
import { coloredLog } from '../../utils/getColoredLog.js';

export const rm = async (filePath, shouldLog = true) => {
  try {
    await fs.rm(filePath);
    if (shouldLog) coloredLog(`File ${filePath} removed successfully`, 'green');
  } catch (error) {
    if (shouldLog) {
      coloredLog(FILE_NOT_FOUND, 'red');
    } else {
      throw new Error(error.message);
    }
  }
};
