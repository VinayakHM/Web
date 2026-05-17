import test from '@fixtures/BaseTest';
import { Page, expect } from '@playwright/test';
import loginData from '@testData/login.json';
import productsData from '@testData/products.json';

test.describe('Add Product Tests', () => {
  test.beforeEach(async ({ page, login, productCatalog }) => {
    await page.goto(BASE_URL);
    await login.enterUsernameField(loginData.validuser.username);
    await login.enterPasswordField(loginData.validuser.password);
    await login.clickOnLoginButton();
    await expect(productCatalog.productListTitle).toBeVisible();
  });

  test('Add Product', async ({ productCatalog, page, cart }) => {
    await productCatalog.addProductsToCart(productsData.testScenarios.addThreeProducts);
    await expect(
      page.locator('[data-test="shopping-cart-link"]'),
    ).toContainText('3');
    await productCatalog.clickOnCartLink();
    await cart.assertProductsInCart(productsData.testScenarios.addThreeProducts);
  });
});
