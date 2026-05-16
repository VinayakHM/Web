import test from '@fixtures/BaseTest';
import { ProductCatalog } from '@pages/ProductCatalog.page';
import { Page, expect } from '@playwright/test';

test.describe('Add Product Tests', () => {
  test.beforeEach(async ({ page, login, productCatalog }) => {
    await page.goto('https://www.saucedemo.com/');
    await login.enterUsernameField('standard_user');
    await login.enterPasswordField('secret_sauce');
    await login.clickOnLoginButton();
    await expect(productCatalog.productListTitle).toBeVisible();
  });

  test('Add Product', async ({ productCatalog, page, cart }) => {
    await productCatalog.addProductsToCart([
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
      'Sauce Labs Onesie',
    ]);
    await expect(
      page.locator('[data-test="shopping-cart-link"]'),
    ).toContainText('3');
    await productCatalog.clickOnCartLink();
    await cart.assertProductsInCart([
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
      'Sauce Labs Onesie',
    ]);
  });
});
