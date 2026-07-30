import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

export async function readJsonFile<T>(relativePath: string): Promise<T> {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const fullPath = path.join(__dirname, '..', relativePath);
  const content = await fs.readFile(fullPath, 'utf-8');
  return JSON.parse(content);
}