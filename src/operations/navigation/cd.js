import path from 'path';
import { coloredLog } from '../../utils/getColoredLog.js';
import { FILE_NOT_FOUND } from '../../constants/index.js';

export const cd = (dirr) => {
  try {
    const currentPath = process.cwd();
    const newPath = path.resolve(currentPath, dirr);
    process.chdir(newPath);
  } catch (error) {
    coloredLog(FILE_NOT_FOUND, 'red');
  }
};
