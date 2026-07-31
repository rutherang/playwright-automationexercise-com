import { Page, Locator } from '@playwright/test';


export class CheckOutPage {
  readonly page: Page;
  readonly commentInput: Locator;
  readonly placeOrderButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.commentInput = this.page.locator('#ordermsg textarea');
    this.placeOrderButton = this.page.getByRole('link', { name: 'Place Order' });
  }

  async addComment(message: string): Promise<void> {
    await this.placeOrderButton.scrollIntoViewIfNeeded();
    await this.commentInput.fill(message);
  }

  async placeOrder(): Promise<void> {
    await this.placeOrderButton.scrollIntoViewIfNeeded();
    await this.placeOrderButton.click();
  }
}