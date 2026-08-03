import { Page, Locator, expect, test } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly products: Locator;
  readonly productNames: Locator;
  readonly productSearchBox: Locator;
  readonly submitSearchButton: Locator;
  readonly continueShoppingMessageButton: Locator;
  readonly viewCartMessageButton: Locator;
  readonly categoryHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.products = page.locator('.single-products');
    this.productNames = page.locator('.productinfo p');
    this.productSearchBox = page.getByRole('textbox', { name: 'search' });
    this.submitSearchButton = page.locator('#submit_search');
    this.continueShoppingMessageButton = this.page.getByRole('button', { name: 'Continue Shopping' });
    this.viewCartMessageButton = this.page.getByRole('link', { name: 'View Cart' });
    this.categoryHeading = this.page.getByRole('heading', { name: 'Category' });
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

  async filterByCategory(categoryName: string, subCategoryName: string): Promise<void> {
    const category = this.page.getByRole('link', { name: categoryName, exact: true });
    await expect(category).toBeVisible();
    await expect(category).toHaveCount(1);
    await category.click();
    const subCategory = this.page.getByRole('listitem').filter({ hasText: subCategoryName }).getByRole('link');
    await expect(subCategory).toBeVisible();
    await expect(subCategory).toHaveCount(1);
    await subCategory.click();
  }

  async checkProductHasNames(productNames: string[]): Promise<void> {
    const actualNames = (await this.productNames.allTextContents()).map((name) => name.replace(/\s+/g, ' ').trim());

    for (const expectedName of productNames) {
      await test.step(`"${expectedName}" exists in product list`, async () => {
        expect(actualNames).toContain(expectedName);
      });
    }
  }

   async filterByBrand(brandName: string): Promise<void> {
    const brand = this.page.getByRole('link', { name: brandName });
    await expect(brand).toBeVisible();
    await expect(brand).toHaveCount(1);
    await brand.click();
  }
}
