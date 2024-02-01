import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

export const getAbsPath = (url, path, filename = '') => {
  try {
    const __filename = fileURLToPath(url);
    const __dirname = dirname(__filename);
    const filePath = join(__dirname, path, filename);
    return filePath;
  } catch (error) {
    console.error('Error while getting absolute path:', error);
    throw error;
  }
};
