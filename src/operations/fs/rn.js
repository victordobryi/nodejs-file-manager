import { rename } from 'fs/promises';
import path from 'path';
import { coloredLog } from '../../utils/getColoredLog.js';
import { FILE_NOT_FOUND } from '../../constants/index.js';

export const rn = async (props) => {
  try {
    const [fileOldPath, newFileName] = props.split(' ');
    const newFilePath = path.join(path.dirname(fileOldPath), newFileName);
    await rename(fileOldPath, newFilePath);
    coloredLog(`File ${fileOldPath} was successfully rename to ${newFilePath}`, 'green');
  } catch (error) {
    coloredLog(FILE_NOT_FOUND, 'red');
  }
};
