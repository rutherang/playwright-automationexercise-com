import { test as base, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { LoginPage } from '../pages/login.page';
import { VALID_USER } from '../constants/valid-user-login';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STORAGE_STATE_PATH = path.join(__dirname, '..', '.auth', 'user.json');

type AuthFixtures = {
  loggedInPage: import('@playwright/test').Page;
};

export const test = base.extend<AuthFixtures>({
  loggedInPage: async ({ browser }, use) => {
    const context = fs.existsSync(STORAGE_STATE_PATH)
      ? await browser.newContext({ storageState: STORAGE_STATE_PATH })
      : await browser.newContext();

    const page = await context.newPage();

    // block ad/tracker requests
    await page.route('**/*doubleclick*/**', route => route.abort());
    await page.route('**/*ads*/**', route => route.abort());

    if (!fs.existsSync(STORAGE_STATE_PATH)) {
      const loginPage = new LoginPage(page);
      await page.goto('/login')
      await loginPage.login(VALID_USER);
      await expect(page.getByText('Logged in as')).toBeVisible();

      fs.mkdirSync(path.dirname(STORAGE_STATE_PATH), { recursive: true });
      await context.storageState({ path: STORAGE_STATE_PATH });
    }

    await use(page);
    await context.close();
  },
});

export { expect };