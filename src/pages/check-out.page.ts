import { Page, Locator, test, expect } from '@playwright/test';
import { AddressDetails } from '../models/address.model';
import fs from 'fs/promises';
import { getDownloadPath } from '../helpers/download-path.helper';

export class CheckOutPage {
  readonly page: Page;
  readonly commentInput: Locator;
  readonly placeOrderButton: Locator;
  readonly deliveryAddress: Locator;
  readonly billingAddress: Locator;

  constructor(page: Page) {
    this.page = page;
    this.commentInput = this.page.locator('#ordermsg textarea');
    this.placeOrderButton = this.page.getByRole('link', { name: 'Place Order' });
    this.deliveryAddress = page.locator('#address_delivery li');
    this.billingAddress = page.locator('#address_invoice li');
  }

  async addComment(message: string): Promise<void> {
    await this.placeOrderButton.scrollIntoViewIfNeeded();
    await this.commentInput.fill(message);
  }

  async placeOrder(): Promise<void> {
    await this.placeOrderButton.scrollIntoViewIfNeeded();
    await this.placeOrderButton.click();
  }

  async verifyAddress(locator: Locator, expected: AddressDetails, label: string): Promise<void> {
    const actualLines = (await locator.allTextContents()).map((text) =>
      text
        .replace(/^\.\s*/, '')
        .replace(/\s+/g, ' ')
        .trim(),
    );

    const expectedValues = Object.values(expected);

    for (const expectedValue of expectedValues) {
      await test.step(`${label} contains "${expectedValue}"`, async () => {
        expect(actualLines).toContain(expectedValue);
      });
    }
  }

  async verifyDeliveryAddress(expected: AddressDetails): Promise<void> {
    await this.verifyAddress(this.deliveryAddress, expected, 'Delivery address');
  }

  async verifyBillingAddress(expected: AddressDetails): Promise<void> {
    await this.verifyAddress(this.billingAddress, expected, 'Billing address');
  }

  async downloadInvoiceAndVerify(): Promise<string> {
    const [download] = await Promise.all([this.page.waitForEvent('download'), this.page.getByRole('link', { name: 'Download Invoice' }).click()]);

    const failure = await download.failure();
    await test.step('Download completed without failure', async () => {
      expect(failure).toBeNull();
    });

    const destination = getDownloadPath(download.suggestedFilename());
    await download.saveAs(destination);
    return destination;
  }

  async verifyInvoiceContents(expectedText: string): Promise<void> {
    const filePath = await this.downloadInvoiceAndVerify();
    const content = await fs.readFile(filePath, 'utf-8');
    expect(content).toContain(expectedText);
  }
}
