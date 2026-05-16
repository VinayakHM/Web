import { Base } from '@pages/Base.page';
import { Locator, Page } from '@playwright/test';

export class ProductCatalog extends Base {
  public page: Page;
  public productListTitle: Locator;
  private cartLink: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.productListTitle = this.getLocatorByDatatest('shopping-cart-link');
    this.cartLink = this.getLocatorByDatatest('shopping-cart-link');
  }

  async addProductsToCart(productNames: string[]) {
    for (const productName of productNames) {
      // Find the inventory item containing the product name
      const productCard = this.page.locator('.inventory_item').filter({
        has: this.page.locator('.inventory_item_name', {
          hasText: productName,
        }),
      });
      // Click Add to cart button inside that product card
      await productCard.locator('button:has-text("Add to cart")').click();
    }
  }

  public async clickOnCartLink(): Promise<void> {
    await this.cartLink.click();
  }
}
