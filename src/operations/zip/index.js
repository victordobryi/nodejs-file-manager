import { stat } from 'fs/promises';
import { createBrotliDecompress, createBrotliCompress } from 'zlib';
import { FILE_NOT_FOUND } from '../../constants/index.js';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { isExist, coloredLog } from '../../utils/index.js';

export const brotli = async (props, action) => {
  try {
    const [sourcePath, destinationPath] = props.split(' ');

    await stat(sourcePath);

    if (await isExist(destinationPath)) {
      return;
    }

    const source = createReadStream(sourcePath);
    const destination = createWriteStream(destinationPath);
    const gzip = action === 'compress' ? createBrotliCompress() : createBrotliDecompress();
    await pipeline(source, gzip, destination);
    coloredLog(`File ${action} successfully from ${sourcePath} to ${destinationPath}`, 'green');
  } catch (error) {
    coloredLog(FILE_NOT_FOUND, 'red');
    coloredLog(error.message, 'red');
  }
};
