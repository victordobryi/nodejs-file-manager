import fs from 'fs/promises';
import { coloredLog } from '../../utils/getColoredLog.js';
import { cp } from './cp.js';

export const mv = async (props) => {
  try {
    const [filePath, newFolderPath] = props.split(' ');

    await cp(props);

    await fs.rm(filePath);
    coloredLog(`File ${filePath} moved to ${newFolderPath}`, 'green');
  } catch (error) {
    coloredLog(error.message, 'red');
  }
};
