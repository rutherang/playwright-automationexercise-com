import { Page, Locator, expect, test } from '@playwright/test';
import { CartItem, ExpectedCartItem } from '../models/cart-item.model';

export class CartPage {
  readonly page: Page;
  readonly cartRows: Locator;
  readonly checkoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartRows = page.locator('#cart_info tbody tr');
    this.checkoutLink = page.getByText('Proceed To Checkout');
  }

  async getCartItems(): Promise<CartItem[]> {
    const rows = await this.cartRows.all();
    const items: CartItem[] = [];

    for (const row of rows) {
      const name = (await row.locator('.cart_description h4 a').textContent())?.trim() ?? '';
      const priceText = (await row.locator('.cart_price p').textContent()) ?? '';
      const quantityText = (await row.locator('.cart_quantity button').textContent()) ?? '';
      const totalText = (await row.locator('.cart_total_price').textContent()) ?? '';

      const item: CartItem = {
        name: name,
        unitPrice: this.parsePrice(priceText),
        quantity: this.parsePrice(quantityText),
        total: this.parsePrice(totalText),
      };

      items.push(item);
    }

    return items;
  }

  private parsePrice(text: string): number {
    const match = text.match(/[\d,]+\.?\d*/);
    return match ? parseFloat(match[0].replace(/,/g, '')) : 0;
  }

  async verifyCartItems(expectedItems: ExpectedCartItem[]) {
    const actualItems = await this.getCartItems();

    for (const expectedItem of expectedItems) {
      await test.step(`Verify "${expectedItem.name}" in cart`, async () => {
        const actualItem = actualItems.find((item) => item.name === expectedItem.name);

        await test.step(`"${expectedItem.name}" exists in cart`, async () => {
          expect(actualItem).toBeDefined();
        });

        if (actualItem) {
          await test.step(`Quantity matches`, async () => {
            expect(actualItem.quantity).toEqual(expectedItem.quantity);
          });
          await test.step(`Unit price matches`, async () => {
            expect(actualItem.unitPrice).toEqual(expectedItem.unitPrice);
          });
          await test.step(`Total matches`, async () => {
            const expectedTotal = expectedItem.quantity * expectedItem.unitPrice;
            expect(actualItem.total).toEqual(expectedTotal);
          });
        }
      });
    }
  }

  async removeProductByName(productName: string) {
    const row = this.cartRows.filter({ hasText: productName});
    expect (row).toHaveCount(1);
    await row.locator('.cart_quantity_delete').click();
  }


}
