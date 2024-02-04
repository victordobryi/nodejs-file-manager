import path from 'path';
import { chdir } from 'process';

export const up = () => chdir(path.resolve(process.cwd(), '..'));
