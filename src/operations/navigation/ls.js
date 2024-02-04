import { readdir, stat } from 'fs/promises';
import path from 'path';
import { coloredLog } from '../../utils/getColoredLog.js';
import { SOMETHING_WRONG } from '../../constants/index.js';

export const ls = async () => {
  try {
    const currentPath = process.cwd();
    const items = await readdir(currentPath);

    const promises = items.map(async (item) => {
      const fullPath = path.join(currentPath, item);

      try {
        const stats = await stat(fullPath);
        return {
          name: item,
          type: stats.isDirectory() ? 'directory' : 'file',
        };
      } catch (error) {
        return null;
      }
    });

    const structedData = (await Promise.all(promises)).filter(Boolean);
    console.table(structedData);
  } catch (error) {
    coloredLog(SOMETHING_WRONG, 'red');
    console.error(error.message);
  }
};
