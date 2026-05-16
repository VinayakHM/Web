import test from '@fixtures/BaseTest';
import { expect } from '@playwright/test';

test.describe('Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

  test('Valid Login', async ({ login, page, productCatalog }) => {
    await login.enterUsernameField('standard_user');
    await login.enterPasswordField('secret_sauce');
    await login.clickOnLoginButton();
    await expect(productCatalog.productListTitle).toBeVisible();
  });

  test('Invalid Login', async ({ login }) => {
    await login.enterUsernameField('vinayak');
    await login.enterPasswordField('vinayak@123');
    await login.clickOnLoginButton();
    await login.assertInvalidCredentialErrorMessage();
  });
});
