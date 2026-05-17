import test from '@fixtures/BaseTest';
import { expect } from '@playwright/test';
import loginData from '@testData/login.json';
import productsData from '@testData/products.json';
import checkoutData from '@testData/checkout.json';

test.describe('E2E Test', () => {
  test.beforeEach(async ({ page, login }) => {
    await page.goto(BASE_URL);
    await login.enterUsernameField(loginData.validuser.username);
    await login.enterPasswordField(loginData.validuser.password);
    await login.clickOnLoginButton();
  });

  test('Complete Checkout Flow', async ({
    productCatalog,
    cart,
    checkout,
    checkoutOverview,
    checkOutSuccess,
  }) => {
    await expect(productCatalog.productListTitle).toBeVisible();
    await productCatalog.addProductsToCart(
      productsData.testScenarios.addThreeProducts,
    );
    await productCatalog.clickOnCartLink();
    await cart.assertProductsInCart(
      productsData.testScenarios.addThreeProducts,
    );
    await cart.clickOnCheckoutButton();
    await checkout.enterFirstName(checkoutData.validCheckoutUser.firstName);
    await checkout.enterLastName(checkoutData.validCheckoutUser.lastName);
    await checkout.enterPostalCode(checkoutData.validCheckoutUser.postalCode);
    await checkout.clickOnContinueButton();
    await checkoutOverview.clickOnFinishButton();
    await checkOutSuccess.checkThankYouMessage();
    await checkOutSuccess.clickOnContinueShoppingButton();
  });

  test('Checkout Form Validation Errors', async ({
    productCatalog,
    cart,
    checkout,
  }) => {
    await expect(productCatalog.productListTitle).toBeVisible();
    await productCatalog.addProductsToCart(
      productsData.testScenarios.addThreeProducts,
    );
    await productCatalog.clickOnCartLink();
    await cart.assertProductsInCart(
      productsData.testScenarios.addThreeProducts,
    );
    await cart.clickOnCheckoutButton();
    await checkout.clickOnContinueButton();
    await expect(checkout.errorMessage).toContainText(
      checkoutData.errorMessages.firstNameRequired,
    );
  });
});
