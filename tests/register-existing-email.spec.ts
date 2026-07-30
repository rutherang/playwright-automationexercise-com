import { test, expect } from '@playwright/test';
import { SignUpPage } from '../src/pages/signup.page';
import { EXISTING_SIGNUP_USER } from '../src/constants/existing-user-signup';

test('TC#5 Register with existing email', async ({ page }) => {
  await page.goto('/login');
  await new SignUpPage(page).signUp(EXISTING_SIGNUP_USER);
  await expect(page.getByText('Email Address already exist')).toBeVisible();
});