import { Page, Locator, expect, test } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly products: Locator;
  readonly productSearchBox: Locator;
  readonly submitSearchButton: Locator;
  readonly continueShoppingMessageButton: Locator;
  readonly viewCartMessageButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.products = page.locator('.single-products');
    this.productSearchBox = page.getByRole('textbox', { name: 'search' });
    this.submitSearchButton = page.locator('#submit_search');
    this.continueShoppingMessageButton = this.page.getByRole('button', { name: 'Continue Shopping' });
    this.viewCartMessageButton = this.page.getByRole('link', { name: 'View Cart' });
  }

  async verifyProductAddedConfirmationMessage(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: 'Added!' })).toBeVisible();
    await expect(this.viewCartMessageButton).toBeVisible();
    await expect(this.continueShoppingMessageButton).toBeVisible();
  }

  async addProductToCartByName(productName: string): Promise<void> {
    const product = this.products.filter({ hasText: productName });
    const matchedNames = (await product.allTextContents()).map((text) => text.replace(/\s+/g, ' ').trim());
    await expect(product, `Expected exactly 1 product matching "${productName}", but found: ${JSON.stringify(matchedNames)}`).toHaveCount(1); // ensures exactly one match
    await product.scrollIntoViewIfNeeded();
    await product.hover();
    // Add to Cart button has two instances and has the same html signature
    await product.getByText('Add to cart').first().click();
  }

  async viewProductByName(productName: string): Promise<void> {
    const productCard = this.page.locator('.product-image-wrapper').filter({ hasText: productName });
    try {
      await expect(productCard).toHaveCount(1); // Make sure only one return
    } catch (error) {
      throw new Error(`Expected exactly only 1 product matching ${productName}
        but found ${productCard.count}\n${error}`);
    }

    await productCard.getByText('View Product').scrollIntoViewIfNeeded();
    await productCard.getByText('View Product').click();
  }

  async searchProducts(searchQuery: string): Promise<void> {
    await this.productSearchBox.fill(searchQuery);
    await this.submitSearchButton.click();
  }

  async verifyAllProductsContainText(searchText: string) {
    const productNames = await this.products.allTextContents();
    expect(productNames.length).toBeGreaterThan(0);

    for (const [index, name] of productNames.entries()) {
      await test.step(`Product ${index + 1} contains "${searchText}"`, async () => {
        expect(name.toLowerCase()).toContain(searchText.toLowerCase());
      });
    }
  }

  async continueShopping(): Promise<void> {
    await expect(this.continueShoppingMessageButton).toBeVisible();
    await this.continueShoppingMessageButton.click();
  }

  async viewCart(): Promise<void> {
    await expect(this.viewCartMessageButton).toBeVisible();
    await this.viewCartMessageButton.click();
    await expect(this.page.getByText('Shopping Cart')).toBeVisible();
  }
}
