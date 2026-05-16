import { Locator, Page, expect } from '@playwright/test';
import { Base } from './Base.page';

export class Cart extends Base {
  public page: Page;
  private checkOutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.checkOutButton = this.getLocatorByDatatest('checkout');
  }

  async assertProductsInCart(products: string[]) {
    for (const product of products) {
      const cartItem = this.page.locator('.cart_item').filter({
        has: this.page.locator('.inventory_item_name', {
          hasText: product,
        }),
      });
      await expect(cartItem).toBeVisible();
    }
  }

  public async clickOnCheckoutButton(): Promise<void> {
    await this.checkOutButton.click();
  }
}
