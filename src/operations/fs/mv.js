import { coloredLog } from '../../utils/getColoredLog.js';
import { cp } from './cp.js';
import { rm } from './rm.js';

export const mv = async (props) => {
  try {
    const [filePath, newFolderPath] = props.split(' ');

    await cp(props, false);
    await rm(filePath, false);

    coloredLog(`File ${filePath} moved to ${newFolderPath}`, 'green');
  } catch (error) {
    coloredLog(error.message, 'red');
  }
};
