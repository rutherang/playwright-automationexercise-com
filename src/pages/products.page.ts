import { Page, Locator, expect, test } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly products: Locator;
  readonly productSearchBox: Locator;
  readonly submitSearchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.products = page.locator('.single-products');
    this.productSearchBox = page.getByRole('textbox', { name: 'search' });
    this.submitSearchButton = page.locator('#submit_search');
  }

  async verifyProductAddedConfirmationMessage(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: 'Added!' })).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'View Cart' })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Continue Shopping' })).toBeVisible();
  }

  async addProductToCartByName(productName: string): Promise<void> {
    const product = this.products.filter({ hasText: productName });
    await expect(product).toHaveCount(1); // ensures exactly one match
    await product.scrollIntoViewIfNeeded();
    await product.hover();
    await product.getByText('Add to cart').click();
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
}
