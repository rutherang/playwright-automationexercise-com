import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class TestCasePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expandTestCase(name: string): Promise<void> {
    await this.page.getByRole('link', { name: name }).click();
  }

  async getTestCaseSteps(locatorName: string): Promise<string[]> {
    const items = await this.page.locator(`${locatorName} .list-group li.list-group-item`).allTextContents();
    const cleaned = items.map(text => text.replace(/\s+/g, ' ').trim()).filter(Boolean);
    return cleaned;
  }
}