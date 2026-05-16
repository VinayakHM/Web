import { Locator, Page } from '@playwright/test';

export class Cart {
  public page: Page;
  public logi: Locator;
  public username: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logi = page.locator('');
    this.username = page.locator('');
  }
}
