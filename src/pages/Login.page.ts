import { Base } from '@pages/Base.page';
import { Page, Locator, expect } from '@playwright/test';

export class Login extends Base {
  public page: Page;
  private usernameInputField: Locator;
  private passwordInputField: Locator;
  private loginButton: Locator;
  private invalidCredErrorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.usernameInputField = this.getLocatorByDatatest('username');
    this.passwordInputField = this.getLocatorByDatatest('password');
    this.loginButton = this.getLocatorByDatatest('login-button');
    this.invalidCredErrorMessage = this.getLocatorByDatatest('error');
  }

  public async enterUsernameField(username:string):Promise<void>{
    await this.usernameInputField.fill(username);
  }

  public async enterPasswordField(password:string):Promise<void>{
    await this.passwordInputField.fill(password);
  }

  public async clickOnLoginButton():Promise<void>{
    await this.loginButton.click();
  }

  public async assertInvalidCredentialErrorMessage():Promise<void>{
      await expect(this.invalidCredErrorMessage).toContainText('Epic sadface: Username and password do not match any user in this service');
  }
}
