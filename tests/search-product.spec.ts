import { test, expect } from '@playwright/test';
import { ProductsPage } from '../src/pages/products.page';

test('TC#9 Search Product', async({ page }) => {
  const searchQuery = 'blue';
  await page.goto('/products');
  const productPage = new ProductsPage(page);
  await productPage.searchProducts(searchQuery);
  const filteredProducts = await productPage.products.count();
  expect(filteredProducts).toEqual(7);
  await productPage.verifyAllProductsContainText(searchQuery);
});