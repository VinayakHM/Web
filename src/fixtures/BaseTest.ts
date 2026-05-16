import { Cart } from '@pages/Cart.page';
import { Checkout } from '@pages/Checkout.page';
import { CheckoutOverview } from '@pages/CheckoutOverview.page';
import { CheckOutSuccess } from '@pages/CheckOutSuccess.page';
import { Login } from '@pages/Login.page';
import { ProductCatalog } from '@pages/ProductCatalog.page';
import { test as BaseTest } from '@playwright/test';

const test = BaseTest.extend<{
  login: Login;
  productCatalog: ProductCatalog;
  cart: Cart;
  checkout: Checkout;
  checkoutOverview: CheckoutOverview;
  checkOutSuccess: CheckOutSuccess;
}>({
  login: async ({ page }, use) => {
    await use(new Login(page));
  },
  productCatalog: async ({ page }, use) => {
    await use(new ProductCatalog(page));
  },
  cart: async ({ page }, use) => {
    await use(new Cart(page));
  },
  checkout: async ({ page }, use) => {
    await use(new Checkout(page));
  },
  checkoutOverview: async ({ page }, use) => {
    await use(new CheckoutOverview(page));
  },
  checkOutSuccess: async ({ page }, use) => {
    await use(new CheckOutSuccess(page));
  },
});

export default test;
