import { Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class TestCasePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expandTestCase(name: string): Promise<void> {
    await this.page.getByRole('link', { name: name }).click();
  }

  async getTestCaseSteps(locatorName: string): Promise<string[]> {
    const itemsLocator = this.page.locator(`${locatorName} .list-group li.list-group-item`);
    await expect(itemsLocator.first()).toBeVisible();
    const items = await itemsLocator.allTextContents();
    const cleaned = items.map(text => text.replace(/\s+/g, ' ').trim()).filter(Boolean);
    return cleaned;
  }
}