import { Page, Locator, expect } from "@playwright/test";

export class ProductsPage {
  readonly page: Page;
  readonly products: Locator;

  constructor(page: Page) {
    this.page = page;
    this.products = page.locator(".single-products");
  }

  async verifyProductAddedConfirmationMessage(): Promise<void> {
    await expect(this.page.getByRole("heading", { name: "Added!" })).toBeVisible();
    await expect(this.page.getByRole("link", { name: "View Cart" })).toBeVisible();
    await expect(this.page.getByRole("button", { name: "Continue Shopping" })).toBeVisible();
  }

  async addProductToCartByName(productName: string): Promise<void> {
    const product = this.products.filter({ hasText: productName });
    await expect(product).toHaveCount(1); // ensures exactly one match
    await product.scrollIntoViewIfNeeded();
    await product.hover();
    await product.getByText("Add to cart").click();
  }

  async viewProductByName(productName: string): Promise<void> {
    const productCard = this.page.locator(".product-image-wrapper").filter({ hasText: productName });
    try {
      await expect(productCard).toHaveCount(1); // Make sure only one return
    } catch (error) {
      throw new Error(`Expected exactly only 1 product matching ${productName}
        but found ${productCard.count}\n${error}`);
    }

    await productCard.getByText("View Product").scrollIntoViewIfNeeded();
    await productCard.getByText("View Product").click();
  }
}
