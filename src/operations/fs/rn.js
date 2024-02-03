import fs from 'fs/promises';
import { coloredLog } from '../../utils/getColoredLog.js';
import { FILE_NOT_FOUND } from '../../constants/index.js';
import path from 'path';

export const rn = async (props) => {
  try {
    const [fileOldPath, newFileName] = props.split(' ');
    const newFilePath = path.join(path.dirname(fileOldPath), newFileName);
    await fs.rename(fileOldPath, newFilePath);
    coloredLog(`File ${fileOldPath} was successfully rename to ${newFilePath}`, 'green');
  } catch (error) {
    coloredLog(FILE_NOT_FOUND, 'red');
  }
};
