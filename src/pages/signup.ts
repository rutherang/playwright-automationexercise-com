import { Page, Locator } from '@playwright/test';
import { SignUpInformation } from '../models/user';

export class SignUpPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.getByPlaceholder('Name');
    this.emailInput = page.locator('form').filter({ hasText: 'Signup' })
          .getByPlaceholder('Email Address');
  }

  async signUp(signupInfo: SignUpInformation): Promise<void> {
    await this.nameInput.fill(signupInfo.name ?? '');
    await this.emailInput.fill(signupInfo.email ?? '');
    await this.page.getByRole('button', { name: 'Signup' }).click();
  }
}