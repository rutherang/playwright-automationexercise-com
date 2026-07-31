import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/home.page';
import { ProductsPage } from '../src/pages/products.page';
import { ProductDetailsPage } from '../src/pages/product-details.page';
import { CartPage } from '../src/pages/cart.page';

test('TC#13 Product detail to Cart', async ({ page }) => {
  const productPage = new ProductsPage(page);
  const productDetailPage = new ProductDetailsPage(page);
  const cartPage = new CartPage(page);
  const homePage = new HomePage(page);

  await page.goto('/');
  await homePage.goToProducts();
  await productPage.viewProductByName('Blue Top');

  await productDetailPage.quantityNumericDropdown.fill('4');
  await productDetailPage.addToCardButton.click();
  await productDetailPage.viewCartMessageButton.click();

  await cartPage.verifyCartItems([
    {
      name: 'Blue Top',
      quantity: 4,
      unitPrice: 500,
    },
  ]);


});
