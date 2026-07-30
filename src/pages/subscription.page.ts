import { Page, Locator, expect } from '@playwright/test';

export class SubscriptionPage {
  readonly page: Page;
  readonly subscriptionEmail: Locator;
  readonly subscribeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.subscriptionEmail = page.getByPlaceholder('Your email address');
    this.subscribeButton = page.locator('#subscribe');
  }

  async subscribe(emailAddress: string): Promise<void> {
    await this.page.getByRole('heading', { name: 'Subscription ' }).scrollIntoViewIfNeeded();
    await this.subscriptionEmail.fill(emailAddress);
    await this.subscribeButton.click();
  }

  async verifySubscriptionSuccess(): Promise<void> {
    await expect(this.page.getByText('You have been successfully subscribed!')).toBeVisible();
  }
}
