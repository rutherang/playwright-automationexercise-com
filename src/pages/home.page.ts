import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly allProductsLink: Locator;
  readonly testCasesLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.allProductsLink = this.page.getByRole('link', { name: 'Products' });
    this.testCasesLink = this.page.locator('#header').getByRole('link', { name: 'Test Cases ' });
  }

  async goToProducts(): Promise<void> {
    await this.allProductsLink.click();
  }

  async goToTestCases(): Promise<void> {
    await this.testCasesLink.click();
  }
}