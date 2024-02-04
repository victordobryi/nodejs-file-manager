import { stat } from 'fs/promises';
import { pipeline } from 'stream/promises';
import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress } from 'zlib';
import { FILE_NOT_FOUND } from '../../constants/index.js';
import { coloredLog } from '../../utils/getColoredLog.js';

export const compress = async (props) => {
  try {
    const [sourcePath, destinationPath] = props.split(' ');

    try {
      await stat(destinationPath);
      coloredLog(`File already exists at ${destinationPath}`, 'red');
      return;
    } catch (err) {}

    const source = createReadStream(sourcePath);
    const destination = createWriteStream(destinationPath);
    const gzip = createBrotliCompress();
    await pipeline(source, gzip, destination);
    coloredLog(`File compressed successfully from ${sourcePath} to ${destinationPath}`, 'green');
  } catch (error) {
    coloredLog(FILE_NOT_FOUND, 'red');
  }
};
