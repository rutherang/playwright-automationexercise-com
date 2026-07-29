import { test, expect } from '@playwright/test';
import { newRegisteredUser } from '../src/constants/new-user-registration-info';

test('TC#1 Register User', async ({ page }) => {
  await page.goto('https://www.automationexercise.com/');

  await test.step('Page has been loaded successfully', async () => {
    await expect(page).toHaveTitle('Automation Exercise');
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
  });

  await test.step('New User Signup! is visible', async () => {
    await page.getByRole('link', { name: 'Signup / Login' }).click();
    await expect(page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();
  });

  await test.step('Enter Account information successful', async () => {
    await page.getByPlaceholder('Name').fill(newRegisteredUser.name ?? '');
    await page.locator('form').filter({ hasText: 'Signup' })
      .getByPlaceholder('Email Address').fill(newRegisteredUser.email ?? '');
    await page.getByRole('button', { name: 'Signup' }).click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page.getByText('ENTER ACCOUNT INFORMATION')).toBeVisible();
  });

  await test.step('Name and Email address are filled up', async () => {
    await expect(page.getByRole('textbox', { name: 'Name *', exact: true }))
      .toHaveValue(newRegisteredUser.name ?? '');
    await expect(page.getByRole('textbox', { name: 'Email *', exact: true }))
      .toHaveValue(newRegisteredUser.email ?? '');
    await expect(page.getByRole('textbox', { name: 'Email *', exact: true }))
      .toBeDisabled();
  });

  await test.step('Enter Basic Account information', async () => {
    await page.getByLabel('Mr.').check();
    await page.getByRole('textbox', { name: 'Password *', exact: true })
      .fill(newRegisteredUser.password ?? '');
    await page.locator('#days').selectOption({ label: newRegisteredUser.birthday ?? '' });
    await page.locator('#months').selectOption({ label: newRegisteredUser.birthMonth ?? '' });
    await page.locator('#years').selectOption({ label: newRegisteredUser.birthYear ?? '' });
  });

  await test.step('Sign up for newsletter', async () => {
    await page.getByLabel('Sign up for our newsletter!').check();
  });

  await test.step('Receive special offers from our partners!', async () => {
    await page.getByLabel('Receive special offers from our partners!').check();
  });

  await test.step('Fill Address Information', async () => {
    await page.getByRole('textbox', { name: 'First name *' })
      .fill(newRegisteredUser.FirstName ?? '');
    await page.getByRole('textbox', { name: 'Last name *' })
      .fill(newRegisteredUser.LastName ?? '');
    await page.getByRole('textbox', { name: 'Company', exact: true })
      .fill(newRegisteredUser.Company ?? '');
    await page.getByRole('textbox', { name: 'Address *' })
      .fill(newRegisteredUser.Address ?? '');
    await page.getByRole('textbox', { name: 'Address 2' })
      .fill(newRegisteredUser.Address2 ?? '');
    await page.locator('#country').selectOption({ label: newRegisteredUser.Country ?? '' });
    await page.getByRole('textbox', { name: 'State *' })
      .fill(newRegisteredUser.State ?? '');
    await page.getByRole('textbox', { name: 'City *' })
      .fill(newRegisteredUser.City ?? '');
    await page.getByRole('textbox', { name: 'Zipcode *' })
      .fill(newRegisteredUser.Zipcode ?? '');
    await page.getByRole('textbox', { name: 'Mobile Number *' })
      .fill(newRegisteredUser.MobileNumber ?? '');
  });
});

test.fixme('Create Account Button cannot be click', async ({ page }) => {
  await test.step('Account created successfully', async () => {
    await page.getByRole('button', { name: 'Create Account' }).scrollIntoViewIfNeeded();
    await page.getByRole('button', { name: 'Create Account' }).click();
    // TODO: investigate why Create Account button cannot be click even with { force: true} or using data-qa
    await expect(page.getByText('ACCOUNT CREATED!')).toBeVisible();
  });

  await test.step('New account logged in', async () => {
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.getByText('Logged in as username')).toBeVisible();
  });

  await test.step('Account deleted successful', async () => {
    await page.getByRole('button', { name: 'Delete Account' }).click();
    await expect(page.getByText('ACCOUNT DELETED')).toBeVisible();
  });

  await page.getByRole('button', { name: 'Continue' }).click();
});