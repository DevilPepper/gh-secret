import fs from 'fs';
import { promisify } from 'util';

export const exists = promisify(fs.exists);
export const readFile = promisify(fs.readFile);

export const writeFile = promisify(fs.writeFile);
