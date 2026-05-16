import { Base } from '@pages/Base.page';
import { Page } from '@playwright/test';

export class Login extends Base {
  public page: Page;
  
  constructor(page: Page) {
    super(page);
    this.page = page;
  }
}
