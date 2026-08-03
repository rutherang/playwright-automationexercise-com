import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/home.page';
import { ProductsPage } from '../src/pages/products.page';
import { CartPage } from '../src/pages/cart.page';
import { LoginPage } from '../src/pages/login.page';
import { PRODUCT_NAME } from '../src/constants/product-name';
import { VALID_USER } from '../src/constants/valid-user-login';

test('TC#20 Add to Cart then Login', async ({ page }) => {
  const homePage = new HomePage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const loginPage = new LoginPage(page);

  await page.goto('/');
  await homePage.goToProducts();
  await productsPage.searchProducts('jeans');
  await productsPage.checkProductHasNames([PRODUCT_NAME.SOFT_STRETCH_JEANS, PRODUCT_NAME.GRUNT_BLUE_SLIM_FIT_JEANS, PRODUCT_NAME.REGULAR_FIT_STRAIGHT_JEANS]);

  await productsPage.addProductToCartByName(PRODUCT_NAME.SOFT_STRETCH_JEANS);
  await productsPage.continueShoppingMessageButton.click();
  await productsPage.addProductToCartByName(PRODUCT_NAME.REGULAR_FIT_STRAIGHT_JEANS);
  await productsPage.continueShoppingMessageButton.click();
  await productsPage.addProductToCartByName(PRODUCT_NAME.GRUNT_BLUE_SLIM_FIT_JEANS);
  await productsPage.viewCartMessageButton.click();

  await cartPage.checkCartHasProducts([PRODUCT_NAME.SOFT_STRETCH_JEANS, PRODUCT_NAME.REGULAR_FIT_STRAIGHT_JEANS, PRODUCT_NAME.GRUNT_BLUE_SLIM_FIT_JEANS]);

  await homePage.loginLink.click();
  await loginPage.login(VALID_USER);

  await homePage.cartLink.click();
  await cartPage.checkCartHasProducts([PRODUCT_NAME.SOFT_STRETCH_JEANS, PRODUCT_NAME.REGULAR_FIT_STRAIGHT_JEANS, PRODUCT_NAME.GRUNT_BLUE_SLIM_FIT_JEANS]);

  await cartPage.removeProductByName(PRODUCT_NAME.SOFT_STRETCH_JEANS);
  await cartPage.removeProductByName(PRODUCT_NAME.REGULAR_FIT_STRAIGHT_JEANS);
  await cartPage.removeProductByName(PRODUCT_NAME.GRUNT_BLUE_SLIM_FIT_JEANS);

  await expect(cartPage.cartRows).toHaveCount(0);
});
