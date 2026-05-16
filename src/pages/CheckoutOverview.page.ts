import { Base } from '@pages/Base.page';
import { Locator, Page } from '@playwright/test';

export class CheckoutOverview extends Base {
  public page: Page;
  private finishButton: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.finishButton = this.getLocatorByDatatest('finish');
  }

  public async clickOnFinishButton(): Promise<void> {
    await this.finishButton.click();
  }
}
