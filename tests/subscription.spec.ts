import { test } from '@playwright/test';
import { SubscriptionPage } from '../src/pages/subscription.page';

test.describe('Subscription', () => {
  test('TC#10 subscription in home page', async ({ page }) => {
    await page.goto('/');
    const subscriptionPage = new SubscriptionPage(page);
    await subscriptionPage.subscribe('juandoe777@example.com');
    await subscriptionPage.verifySubscriptionSuccess();
  });

  test('TC#11 subscription in contacts page', async ({ page }) => {
    await page.goto('/contact_us');
    const subscriptionPage = new SubscriptionPage(page);
    await subscriptionPage.subscribe('juandoe777@example.com');
    await subscriptionPage.verifySubscriptionSuccess();
  });
});
