import test from '@fixtures/BaseTest';
import { expect } from '@playwright/test';

test.describe('E2E Test', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });
  test('E2E', async ({
    login,
    productCatalog,
    cart,
    checkout,
    checkoutOverview,
    checkOutSuccess,
    page,
  }) => {
    await login.enterUsernameField('standard_user');
    await login.enterPasswordField('secret_sauce');
    await login.clickOnLoginButton();
    await expect(productCatalog.productListTitle).toBeVisible();
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
    await cart.clickOnCheckoutButton();
    await checkout.enterFirstName('Vinayak');
    await checkout.enterLastName('M');
    await checkout.enterPostalCode('560066');
    await checkout.clickOnContinueButton();
    await checkoutOverview.clickOnFinishButton();
    await checkOutSuccess.checkThankYouMessage();
    await checkOutSuccess.clickOnContinueShoppingButton();
    await page.waitForTimeout(10000);
  });
});
