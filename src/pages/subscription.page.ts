import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class SubscriptionPage extends BasePage {
  readonly subscriptionEmail: Locator;
  readonly subscribeButton: Locator;
  readonly subscriptionSuccessMessage: string = 'You have been successfully subscribed!';

  constructor(page: Page) {
    super(page);
    this.subscriptionEmail = page.getByPlaceholder('Your email address');
    this.subscribeButton = page.locator('#subscribe');
  }

  async subscribe(emailAddress: string): Promise<void> {
    await this.page.getByRole('heading', { name: 'Subscription ' }).scrollIntoViewIfNeeded();
    await this.subscriptionEmail.fill(emailAddress);
    await this.subscribeButton.click();
  }
}
