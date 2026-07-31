import { Page, Locator, expect } from '@playwright/test';
import { PaymentDetails } from '../models/payment.model';

export class PaymentPage {
  readonly page: Page;
  readonly nameOnCardInput: Locator;
  readonly cardNumberInput: Locator;
  readonly cvcInput: Locator;
  readonly expirationMonthInput: Locator;
  readonly expirationYearInput: Locator;
  readonly payAndConfirmOrderButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameOnCardInput = this.page.locator('input[name="name_on_card"]');
    this.cardNumberInput = this.page.locator('input[name="card_number"]');
    this.cvcInput = this.page.getByRole('textbox', { name: 'ex.' });
    this.expirationMonthInput = this.page.getByPlaceholder('MM');
    this.expirationYearInput = this.page.getByPlaceholder('YYYY');
    this.payAndConfirmOrderButton = this.page.getByRole('button', { name: 'Pay and Confirm Order' });
  }

  async verifyPaymentPage(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: 'Payment' })).toBeVisible();
    await expect(this.nameOnCardInput).toBeVisible();
  }

  async verifySuccessfulPayment(): Promise<void> {
    await expect(this.page.getByText('Congratulations! Your order has been confirmed')).toBeVisible();
  }

  async fillCardDetails(paymentDetails: PaymentDetails): Promise<void> {
    await this.nameOnCardInput.fill(paymentDetails.name);
    await this.cardNumberInput.fill(paymentDetails.cardNumber);
    await this.cvcInput.fill(paymentDetails.cvc);
    await this.expirationMonthInput.fill(paymentDetails.expirationMonth);
    await this.expirationYearInput.fill(paymentDetails.expirationYear);
  }
}