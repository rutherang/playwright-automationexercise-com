import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/home.page';

test.describe('Scroll', () => {
  test('TC#25 Scroll to top button when on bottom of the page', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Subscription').scrollIntoViewIfNeeded();
    await expect(page.getByText('Subscription')).toBeVisible();
    await page.locator('#scrollUp').click();
    await expect(page.getByRole('heading', { name: 'Full-Fledged practice website' })).toBeVisible();
  });

  test('TC#26 Scroll to top when on bottom of the page', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Subscription').scrollIntoViewIfNeeded();
    await expect(page.getByText('Subscription')).toBeVisible();
    await new HomePage(page).scrollToTopUsingPageUp(page);
    await expect(page.getByRole('heading', { name: 'Full-Fledged practice website' })).toBeVisible();
  });
});
