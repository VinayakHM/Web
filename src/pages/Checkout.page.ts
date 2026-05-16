import { Base } from '@pages/Base.page';
import { Page, Locator } from '@playwright/test';

export class Checkout extends Base {
  public page: Page;
  private firstNameInputField: Locator;
  private lastNameInputField: Locator;
  private postalCodeInputField: Locator;
  private continueButton: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.firstNameInputField = this.getLocatorByDatatest('firstName');
    this.lastNameInputField = this.getLocatorByDatatest('lastName');
    this.postalCodeInputField = this.getLocatorByDatatest('postalCode');
    this.continueButton = this.getLocatorByDatatest('continue');
  }

  public async enterFirstName(firstName: string): Promise<void> {
    await this.firstNameInputField.fill(firstName);
  }

  public async enterLastName(lastName: string): Promise<void> {
    await this.lastNameInputField.fill(lastName);
  }

  public async enterPostalCode(postalCode: string): Promise<void> {
    await this.postalCodeInputField.fill(postalCode);
  }

  public async clickOnContinueButton(): Promise<void> {
    await this.continueButton.click();
  }
}
