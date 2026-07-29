import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/login';
import { INVALID_USER } from '../src/constants/invalid-user-login';

test('TC#3 Login User with incorrect email and password', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Automation Exercise');
  await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();

  await page.getByRole('link', { name: 'Signup / Login' }).click();
  await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();

  await new LoginPage(page).Login(INVALID_USER);

  await expect(page.getByText('Your email or password is incorrect')).toBeVisible();
});