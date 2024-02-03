import { FILE_NOT_FOUND } from '../../constants/index.js';
import { createBrotliCompress } from 'zlib';
import { pipeline } from 'stream/promises';
import { createReadStream, createWriteStream } from 'fs';
import { coloredLog } from '../../utils/getColoredLog.js';
import fs from 'fs/promises';

export const compress = async (props) => {
  try {
    const [sourcePath, destinationPath] = props.split(' ');

    try {
      await fs.stat(destinationPath);
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
