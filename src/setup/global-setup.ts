import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function globalSetup() {
  console.log('🔥🔥🔥 GLOBAL SETUP IS RUNNING 🔥🔥🔥');
  // throw new Error('STOP HERE TO CONFIRM THIS RUNS');
  const downloadsDir = path.join(__dirname, '..', '..', 'downloads');
  console.log('🔥🔥🔥 Clearing downloads at:', downloadsDir);
  await fs.rm(downloadsDir, { recursive: true, force: true });
  await fs.mkdir(downloadsDir, { recursive: true });
  console.log('🔥🔥🔥 Downloads folder cleared and recreated.');
}

export default globalSetup;
