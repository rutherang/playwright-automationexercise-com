import { Page, Locator } from '@playwright/test';
import { LoginInformation } from '../models/user';


export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address');
    this.passwordInput = page.getByPlaceholder('Password');
  }

  async login(loginInfo: LoginInformation): Promise<void> {
    await this.usernameInput.fill(loginInfo.username ?? '');
    await this.passwordInput.fill(loginInfo.password ?? '');
    await this.page.getByRole('button', { name: 'Login' }).click();
  }
}