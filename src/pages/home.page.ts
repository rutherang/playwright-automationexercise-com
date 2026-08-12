import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  readonly allProductsLink: Locator;
  readonly testCasesLink: Locator;
  readonly cartLink: Locator;
  readonly loginLink: Locator;

  constructor(page: Page) {
    super(page);
    this.allProductsLink = this.page.getByRole('link', { name: 'Products' });
    this.testCasesLink = this.page.locator('#header').getByRole('link', { name: 'Test Cases ' });
    this.cartLink = this.page.getByRole('link', { name: 'Cart' });
    this.loginLink = this.page.getByRole('link', { name: 'Signup / Login' });
  }

  async goToProducts(): Promise<void> {
    await this.allProductsLink.click();
  }

  async goToTestCases(): Promise<void> {
    await this.testCasesLink.click();
  }

  async goToViewCart(): Promise<void> {
    await this.cartLink.click();
  }

  async scrollToTopUsingPageUp(): Promise<void> {
    await super.scrollToTopUsingPageUp();
  }
}
