import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { SignUpInformation } from '../models/user';

export class SignUpPage extends BasePage {
  readonly nameInput: Locator;
  readonly emailInput: Locator;

  constructor(page: Page) {
    super(page);
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