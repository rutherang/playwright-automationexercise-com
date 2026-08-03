// import { test, expect } from '@playwright/test';
import { test, expect } from '../src/fixtures/auth.fixture';
import { HomePage } from '../src/pages/home.page';
import { ProductsPage } from '../src/pages/products.page';
import { CartPage } from '../src/pages/cart.page';
import { ExpectedCartItem } from '../src/models/cart-item.model';
import { readJsonFile } from '../src/helpers/read-json.helper';
import { PRODUCT_NAME } from '../src/constants/product-name';

test.describe('Cart', () => {
  test.describe.configure({ mode: 'serial' });
  test('TC#12 Add products in cart', async ({ loggedInPage }) => {
    const homePage = new HomePage(loggedInPage);
    const productsPage = new ProductsPage(loggedInPage);
    const cartPage = new CartPage(loggedInPage);
    const expectedItems = await readJsonFile<ExpectedCartItem[]>('data/tc12-cart-items.data.json');

    await loggedInPage.goto('/');
    await homePage.goToProducts();
    await productsPage.addProductToCartByName(PRODUCT_NAME.BLUE_TOP);
    await productsPage.continueShopping();
    await productsPage.addProductToCartByName(PRODUCT_NAME.MEN_TSHIRT);
    await productsPage.viewCart();
    await cartPage.verifyCartItems(expectedItems);
  });

  test('TC#17 Remove products from cart', async ({ loggedInPage }) => {
    const homePage = new HomePage(loggedInPage);
    const cartPage = new CartPage(loggedInPage);
    await loggedInPage.goto('/');
    await homePage.goToViewCart();
    await cartPage.removeProductByName(PRODUCT_NAME.BLUE_TOP);
    await expect(cartPage.cartRows.filter({ hasText: PRODUCT_NAME.BLUE_TOP })).toHaveCount(0);
    await cartPage.removeProductByName(PRODUCT_NAME.MEN_TSHIRT);
    await expect(cartPage.cartRows.filter({ hasText: PRODUCT_NAME.MEN_TSHIRT })).toHaveCount(0);
  });
});
