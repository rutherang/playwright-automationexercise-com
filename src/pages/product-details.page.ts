import { Page, Locator, expect } from '@playwright/test';

export class ProductDetailsPage {
  readonly page: Page;
  readonly productName: Locator;
  readonly category: Locator;
  readonly price: Locator;
  readonly availability: Locator;
  readonly condition: Locator;
  readonly brand: Locator;
  readonly quantityNumericDropdown: Locator;
  readonly addToCardButton: Locator;
  readonly continueShoppingMessageButton: Locator;
  readonly viewCartMessageButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.locator('.product-information h2');
    this.category = page.locator('.product-information p', { hasText: 'Category' });
    this.price = page.locator('.product-information span span');
    this.availability = page.locator('.product-information p', { hasText: 'Availability' });
    this.condition = page.locator('.product-information p', { hasText: 'Condition' });
    this.brand = page.locator('.product-information p', { hasText: 'Brand' });
    this.quantityNumericDropdown = page.locator('#quantity');
    this.addToCardButton = page.getByRole('button', { name: 'Add To Cart' });
    this.continueShoppingMessageButton = this.page.getByRole('button', { name: 'Continue Shopping' });
    this.viewCartMessageButton = this.page.getByRole('link', { name: 'View Cart' });
  }

  async verifyProductDetailsVisible(): Promise<void> {
    await expect(this.productName).toBeVisible();
    await expect(this.category).toBeVisible();
    await expect(this.price).toBeVisible();
    await expect(this.availability).toBeVisible();
    await expect(this.condition).toBeVisible();
    await expect(this.brand).toBeVisible();
  }

  async addReviewOnProduct(name: string, email: string, review: string): Promise<void> {
    await this.page.getByPlaceholder('Your Name').fill(name);
    await this.page.getByRole('textbox', { name: 'Email Address', exact: true }).fill(email);
    await this.page.getByPlaceholder('Add Review Here').fill(review);
    await this.page.getByRole('button', { name: 'Submit' }).click();
  }
}