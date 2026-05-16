import { Base } from '@pages/Base.page';
import { Page, Locator, expect } from '@playwright/test';

export class CheckOutSuccess extends Base {
  public page: Page;
  private successMessage: Locator;
  private continueShoppingButton: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.successMessage = this.getLocatorByDatatest('complete-header');
    this.continueShoppingButton = this.getLocatorByDatatest('back-to-products');
  }

  public async checkThankYouMessage(): Promise<void> {
    await expect(this.successMessage).toContainText(
      'Thank you for your order!',
    );
  }
  
  public async clickOnContinueShoppingButton(): Promise<void> {
    await this.continueShoppingButton.click();
  }
}
