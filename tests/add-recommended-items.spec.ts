import { test } from '@playwright/test';
import { PRODUCT_NAME } from '../src/constants/product-name';
import { CartPage } from '../src/pages/cart.page';
import { ProductsPage } from '../src/pages/products.page';

test('TC#22 Add recommended item', async ({ page }) => {
  const productPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  await page.goto('/');
  await page.getByText('recommended items').scrollIntoViewIfNeeded();
  await productPage.addRecommendedProductToCart(PRODUCT_NAME.STYLISH_DRESS);
  await productPage.viewCart();
  await cartPage.verifyCartItems([{ name: PRODUCT_NAME.STYLISH_DRESS, quantity: 1, unitPrice: 1500 }]);
});
