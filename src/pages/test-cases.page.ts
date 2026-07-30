import { Page } from '@playwright/test';

export class TestCasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
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