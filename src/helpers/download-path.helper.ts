import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function getDownloadPath(filename: string): string {
  const ext = path.extname(filename);
  const base = path.basename(filename, ext);
  const unique = `${base}-${Date.now()}${ext}`;
  return path.join(__dirname, '../..', 'downloads', unique);
}