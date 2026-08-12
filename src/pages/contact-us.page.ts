import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class ContactUsPage extends BasePage {
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly subjectInput: Locator;
  readonly messageInput: Locator;
  readonly uploadFileInput: Locator;

  constructor(page: Page) {
    super(page);
    this.nameInput = page.getByPlaceholder('Name');
    this.emailInput = page.getByPlaceholder('Email', { exact: true });
    this.subjectInput = page.getByPlaceholder('Subject');
    this.messageInput = page.getByPlaceholder('Your Message Here');
    this.uploadFileInput = page.locator('input[name="upload_file"]');
  }

  async fill(name: string, email: string, subject: string,
    message: string, filepath: string): Promise<void> {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.subjectInput.fill(subject);
    await this.messageInput.fill(message);
    await this.uploadFileInput.setInputFiles(filepath);
  }
}