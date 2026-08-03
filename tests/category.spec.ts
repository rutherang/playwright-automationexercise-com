import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/home.page';
import { ProductsPage } from '../src/pages/products.page';

test('TC#18 Products by Category', async ({ page }) => {
  const homePage = new HomePage(page);
  const productsPage = new ProductsPage(page);

  await page.goto('/');
  await homePage.goToProducts();
  await expect(productsPage.categoryHeading).toBeVisible();
  await productsPage.filterByCategory(' Women', 'Tops');
  await expect(productsPage.products).toHaveCount(6);

  await productsPage.filterByCategory(' Men', 'Jeans');
  await expect(productsPage.products).toHaveCount(3);

  await productsPage.checkProductHasNames(['Soft Stretch Jeans', 'Grunt Blue Slim Fit Jeans']);
});
