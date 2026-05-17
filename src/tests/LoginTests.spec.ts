import test from '@fixtures/BaseTest';
import { expect } from '@playwright/test';
import loginData from '@testData/login.json';

test.describe('Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('Valid Login', async ({ login: loginPage, page, productCatalog }) => {
    await loginPage.enterUsernameField(loginData.validuser.username);
    await loginPage.enterPasswordField(loginData.validuser.password);
    await loginPage.clickOnLoginButton();
    await expect(productCatalog.productListTitle).toBeVisible();
  });

  test('Invalid Login', async ({ login: loginPage }) => {
    await loginPage.enterUsernameField(loginData.invaliduser.username);
    await loginPage.enterPasswordField(loginData.invaliduser.password);
    await loginPage.clickOnLoginButton();
    await loginPage.assertInvalidCredentialErrorMessage();
  });
});
