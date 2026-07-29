import { test, expect } from '@playwright/test';
import { VALID_USER } from '../src/constants/valid-user-login';

test('TC#2 Login User with correct email and password', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Automation Exercise');
  await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();

  await page.getByRole('link', { name: 'Signup / Login' }).click();
  await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();

  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill(VALID_USER.username ?? '');
  await page.getByPlaceholder('Password').fill(VALID_USER.password ?? '');

  await page.getByRole('button', { name: 'Login'}).click();

  await expect(page.getByText('Logged in as John Doe')).toBeVisible();
});