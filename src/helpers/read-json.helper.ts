import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Reads and parses a JSON file from the data folder.
 * @param filePath - relative path from the project root, e.g. 'data/cart-items.data.json'
 */
export async function readJsonFile<T>(filePath: string): Promise<T> {
  const fullPath = path.join(__dirname, '..', filePath);
  const content = await fs.readFile(fullPath, 'utf-8');
  return JSON.parse(content) as T;
}