import { Page } from '@playwright/test';

export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async scrollToTopUsingPageUp(): Promise<void> {
    let previousScrollY = -1;
    let currentScrollY = await this.page.evaluate(() => window.scrollY);

    while (currentScrollY !== previousScrollY && currentScrollY > 0) {
      previousScrollY = currentScrollY;
      await this.page.keyboard.press('PageUp');
      currentScrollY = await this.page.evaluate(() => window.scrollY);
    }
  }
}
