import { createReadStream, createWriteStream } from 'fs';
import { access, mkdir } from 'fs/promises';
import path from 'path';
import { coloredLog } from '../../utils/getColoredLog.js';
import { FILE_NOT_FOUND } from '../../constants/index.js';

export const cp = async (props, shouldLog = true) => {
  try {
    const [filePath, newFolderPath] = props.split(' ');

    const fileName = path.basename(filePath);

    try {
      await access(newFolderPath);
    } catch (error) {
      await mkdir(newFolderPath);
    }

    const newFilePath = path.join(newFolderPath, fileName);

    await access(filePath);

    try {
      await access(newFilePath);
      coloredLog(`File already exists at ${newFilePath}`, 'red');
      return;
    } catch (err) {}

    const readableStream = createReadStream(filePath);

    readableStream.on('error', (error) => {
      coloredLog(`Error copying file: ${error.message}`, 'red');
    });

    const writableStream = createWriteStream(newFilePath);

    readableStream.pipe(writableStream);

    writableStream.on('finish', () => {
      if (shouldLog) {
        coloredLog(`File copied successfully from ${filePath} to ${newFilePath}`, 'green');
      }
    });

    writableStream.on('error', (error) => {
      coloredLog(`Error copying file: ${error.message}`, 'red');
    });
  } catch (error) {
    if (shouldLog) {
      coloredLog(FILE_NOT_FOUND, 'red');
    } else {
      throw new Error(error.message);
    }
  }
};
