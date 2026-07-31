import { test, expect } from '@playwright/test';
import { ProductsPage } from '../src/pages/products.page';
import { ProductDetailsPage } from '../src/pages/product-details.page';
import { HomePage } from '../src/pages/home.page';

test('TC#8 Verify Product Page and Product detail page', async ({ page }) => {
  const productPage = new ProductsPage(page);
  const productPageDetails = new ProductDetailsPage(page);
  await page.goto('/');
  await new HomePage(page).goToProducts();

  await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Category' })).toBeVisible();

  await test.step('Product loaded should be more than 1', async () => {
    const productCount = await page.locator('.single-products').count();
    expect(productCount).toBeGreaterThan(1);
  });

  await productPage.viewProductByName('Winter Top');

  await test.step('Product name is visible', async () => {
    await expect(productPageDetails.productName).toBeVisible();
    await expect(productPageDetails.productName).not.toBeEmpty();
  });

  await test.step('Category is visible', async () => {
    await expect(productPageDetails.category).toBeVisible();
  });

  await test.step('Price is visible', async () => {
    await expect(productPageDetails.price).toBeVisible();
  });

  await test.step('Availability is visible', async () => {
    await expect(productPageDetails.availability).toBeVisible();
  });

  await test.step('Condition is visible', async () => {
    await expect(productPageDetails.condition).toBeVisible();
  });

  await test.step('Brand is visible', async () => {
    await expect(productPageDetails.brand).toBeVisible();
  });
});
