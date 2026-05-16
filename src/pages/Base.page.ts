import {Page, Locator} from '@playwright/test';

export class Base {
protected page: Page;

  optionByName(optionText: string): Locator {
    return this.page.getByRole('option', { name: optionText });
  }
  buttonByName(btnName: string, exact?: boolean): Locator {
    return this.page.getByRole('button', { name: `${btnName}`, exact });
  }

  getLocatorByPartialId(id: string): Locator {
    return this.page.locator(`[id*="${id}"]`);
  }

  checkboxGetByRole(grade: string): Locator {
    return this.page.getByRole('checkbox', { name: grade, exact: true });
  }

  /**
   * This is meant as an object for all page objects to be extended from
   * and contain a base set of properties and methods for all page objects.
   * Not likely necessary to instantiate this class.
   * @param {Page} page - The Playwright page instance
   */
  constructor(page: Page) {
    this.page = page;
  }
}