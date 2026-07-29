import { test, expect } from '@playwright/test';
import { VALID_USER } from '../src/constants/valid-user-login';
import { LoginPage } from '../src/pages/login';

test('TC#4 Logout User', async ({ page }) => {
  await page.goto('/login');
  await new LoginPage(page).login(VALID_USER);
  await expect(page.getByText('Logged in as John Doe')).toBeVisible();
  await page.getByRole('link', { name: 'Logout' }).click();
  await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
});