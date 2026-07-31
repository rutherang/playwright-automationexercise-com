import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/home.page';
import { ProductsPage } from '../src/pages/products.page';
import { CartPage } from '../src/pages/cart.page';
import { ExpectedCartItem } from '../src/models/cart-item.model';
import { readJsonFile } from '../src/helpers/read-json.helper';

test.describe('Cart', () => {
  test.describe.configure({ mode: 'serial' });
  test('TC#12 Add products in cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const expectedItems = await readJsonFile<ExpectedCartItem[]>('data/tc12-cart-items.data.json');

    await page.goto('/');
    await homePage.goToProducts();
    await productsPage.addProductToCartByName('Blue Top');
    await productsPage.continueShopping();
    await productsPage.addProductToCartByName('Men Tshirt');
    await productsPage.viewCart();
    await cartPage.verifyCartItems(expectedItems);
  });
});
