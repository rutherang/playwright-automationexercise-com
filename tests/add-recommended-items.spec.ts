import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/home.page';
import { ProductsPage } from '../src/pages/products.page';
import { CartPage } from '../src/pages/cart.page';
import { PRODUCT_NAME } from '../src/constants/product-name';

test('TC#22 Add recommended item', async ({ page }) => {
  const productPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  await page.goto('/');
  await page.getByText('recommended items').scrollIntoViewIfNeeded();
  await productPage.addRecommendedProductToCart(PRODUCT_NAME.BLUE_TOP);
  await productPage.viewCart();
  await cartPage.verifyCartItems([{ name: PRODUCT_NAME.BLUE_TOP, quantity: 1, unitPrice: 500 }]);
});
