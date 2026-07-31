import { test, expect } from '../src/fixtures/auth.fixture';
import { CartPage } from '../src/pages/cart.page';
import { CheckOutPage } from '../src/pages/check-out.page';
import { PaymentPage } from '../src/pages/payment.page';
import { ProductsPage } from '../src/pages/products.page';

test('TC#16 Logged In User Place Order and Checkout', async ({ loggedInPage }) => {
  const productPage = new ProductsPage(loggedInPage);
  const cartPage = new CartPage(loggedInPage);
  const checkOutPage = new CheckOutPage(loggedInPage);
  const paymentPage = new PaymentPage(loggedInPage);

  await loggedInPage.goto('/products');
  await productPage.addProductToCartByName('Blue Top');
  await productPage.viewCart();
  await cartPage.checkoutLink.click();
  await checkOutPage.addComment('This is comment made from automation');

  await expect(checkOutPage.commentInput).toHaveValue('This is comment made from automation');

  await checkOutPage.placeOrder();
  await paymentPage.verifyPaymentPage();
  await paymentPage.fillCardDetails({
    name: 'John Doe',
    cardNumber: '4242424242424242',
    cvc: '111',
    expirationMonth: '12',
    expirationYear: '2030',
  });

  await paymentPage.payAndConfirmOrderButton.click();
  await paymentPage.verifySuccessfulPayment();
});
