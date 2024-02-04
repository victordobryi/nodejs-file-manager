import { writeFile } from 'fs/promises';
import path from 'path';
import { coloredLog } from '../../utils/getColoredLog.js';
import { FILE_EXIST } from '../../constants/index.js';

export const add = async (fileName) => {
  try {
    const src = path.join(process.cwd(), fileName);
    await writeFile(src, '', { flag: 'wx+' });
    coloredLog(`File ${fileName} was successfully created`, 'green');
  } catch (error) {
    coloredLog(FILE_EXIST, 'red');
  }
};
