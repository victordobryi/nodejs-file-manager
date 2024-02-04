import { access } from 'fs/promises';
import { coloredLog } from './getColoredLog.js';

export const isExist = async (path) => {
  try {
    await access(path);
    coloredLog(`File already exists at ${path}`, 'red');
    return true;
  } catch (err) {
    return false;
  }
};
