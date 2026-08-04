import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/home.page';
import { ProductDetailsPage } from '../src/pages/product-details.page';
import { ProductsPage } from '../src/pages/products.page';
import { PRODUCT_NAME } from '../src/constants/product-name';

test('TC#21 Review on product', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductsPage(page);
  const productDetailsPage = new ProductDetailsPage(page);

  await page.goto('/');
  await homePage.goToProducts();
  await productPage.viewProductByName(PRODUCT_NAME.BLUE_TOP);
  await productDetailsPage.addReviewOnProduct('John Doe', 'john.doe@example.com', 'This is a great product!');
  await expect(page.getByText('Thank you for your review.')).toBeVisible();
 });