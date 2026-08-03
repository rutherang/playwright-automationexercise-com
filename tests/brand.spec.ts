import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/home.page';
import { ProductsPage } from '../src/pages/products.page';
import { PRODUCT_NAME } from '../src/constants/product-name';

test('TC#19 Products by Brand', async ({ page }) => {
  const homePage = new HomePage(page);
  const productsPage = new ProductsPage(page);

  await page.goto('/');
  await homePage.goToProducts();
  await productsPage.filterByBrand('Polo');
  await expect(page.getByRole('heading', { name: 'Brand -  Polo Products' })).toBeVisible();
  await expect(page).toHaveURL('/brand_products/Polo');
  await expect(productsPage.products).toHaveCount(6);
  await productsPage.checkProductHasNames([PRODUCT_NAME.BLUE_TOP, PRODUCT_NAME.FANCY_GREEN_TOP]);
});
