import path from 'path';
import { coloredLog } from '../../utils/getColoredLog.js';

export const cd = async (dirr) => {
  try {
    const currentPath = process.cwd();
    const newPath = path.resolve(currentPath, dirr);
    process.chdir(newPath);
  } catch (error) {
    coloredLog('No such file or directory', 'red');
  }
};
