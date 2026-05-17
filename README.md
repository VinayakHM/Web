# Web - Playwright E2E Testing Suite

A comprehensive end-to-end testing framework using Playwright, built with TypeScript and the Page Object Model (POM) pattern. This suite tests the SauceDemo application with complete test coverage for user authentication, product catalog, shopping cart, and checkout workflows.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Setup Instructions](#setup-instructions)
- [How to Run Tests Locally](#how-to-run-tests-locally)
- [Framework Architecture](#framework-architecture)
- [Team Onboarding Guide](#team-onboarding-guide)
- [CI/CD Pipeline Details](#cicd-pipeline-details)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)

---

## Project Overview

This repository contains an end-to-end test automation suite for the SauceDemo web application. The suite covers critical user flows including:

- **Authentication**: Valid and invalid login scenarios
- **Product Management**: Browsing and filtering products
- **Shopping Cart**: Adding/removing products from cart
- **Checkout Process**: Complete checkout workflow with validation
- **E2E Scenarios**: Complete user journeys from login to purchase completion

### Key Features

- ✅ **Cross-browser Testing**: Runs on Chromium, Firefox, and WebKit
- ✅ **Parallel Execution**: Optimized for fast test execution
- ✅ **Page Object Model**: Maintainable and scalable test structure
- ✅ **Comprehensive Reporting**: HTML reports with traces and screenshots
- ✅ **TypeScript Support**: Fully typed test framework
- ✅ **Custom Fixtures**: Reusable page objects with dependency injection
- ✅ **Trace Recording**: Automatic trace collection for failed tests
- ✅ **Code Quality**: ESLint and Prettier integration for consistent code

---

## Setup Instructions

### Prerequisites

- **Node.js**: v16 or higher (v18+ recommended)
- **npm**: v8 or higher
- **Git**: For version control

### Step 1: Clone the Repository

```bash
git clone https://github.com/VinayakHM/Web.git
cd Web
```

### Step 2: Install Dependencies

```bash
npm install
```

This command installs all required dependencies including:
- Playwright and browser binaries
- TypeScript
- Testing utilities
- Code quality tools (ESLint, Prettier)
- Winston logger for logging

### Step 3: Install Playwright Browsers (if not already installed)

```bash
npx playwright install
```

### Step 4: Verify Installation

Run a quick smoke test to ensure everything is set up correctly:

```bash
npm test
```

---

## How to Run Tests Locally

### Run All Tests

```bash
npm test
```

This runs all tests in the `src/tests` directory across all configured browsers (Chromium, Firefox, WebKit) in parallel.

### Run Tests with UI Mode

Interactive mode to see tests execute step-by-step in real-time:

```bash
npm run ui
```

**Features:**
- Visual test execution with live feedback
- Pause and resume test execution
- Step through individual test actions
- Inspect page state at each step

### Run Tests in Debug Mode

Debug mode with full control and browser DevTools:

```bash
npm run debug
```

**Features:**
- Browser DevTools integration
- Inspector tools for element selection
- Ability to pause and inspect page state
- Step through test execution

### Run Specific Test File

```bash
npx playwright test src/tests/LoginTests.spec.ts
```

### Run Specific Test

```bash
npx playwright test -g "Valid Login"
```

The `-g` flag accepts a regex pattern to match test names.

### Generate Test Code with Codegen

Playwright's code generator records user interactions and generates test code:

```bash
npm run codegen
```

This opens a browser and records your interactions as Playwright test code.

### View Test Reports

After running tests, view the HTML report:

```bash
npm run report
```

The report includes:
- Test execution summary
- Individual test details
- Screenshots for failed tests
- Video recordings (if enabled)
- Traces for debugging

### Run Tests with Specific Configuration

```bash
# Run tests only on Chrome
npx playwright test --project=chromium

# Run tests on Firefox
npx playwright test --project=firefox

# Run tests on Safari
npx playwright test --project=webkit

# Run single-threaded (one test at a time)
npx playwright test --workers=1

# Run with verbose output
npx playwright test --verbose
```

---

## Framework Architecture

### Overview

The test framework follows the **Page Object Model (POM)** design pattern, which separates test logic from page interaction logic, making tests more maintainable and scalable.

```
src/
├── fixtures/          # Custom test fixtures with page object injection
├── pages/             # Page Object classes encapsulating UI interactions
├── tests/             # Test specifications (*.spec.ts)
└── utils/             # Helper utilities, constants, and logging
```

### Architecture Diagram

```
Test Files (*.spec.ts)
    ↓
Custom Fixtures (BaseTest.ts)
    ↓
Page Objects (Login.page.ts, Cart.page.ts, etc.)
    ↓
Base Page Class (Base.page.ts)
    ↓
Playwright Page/Locator API
```

### Core Components

#### 1. **Page Objects** (`src/pages/`)

Each page object encapsulates all interactions with a specific page or component:

- **Base.page.ts**: Base class with common locator methods
  - `buttonByName()`: Get button by text
  - `getLocatorByDatatest()`: Get element by data-test attribute
  - `getLocatorByPartialId()`: Get element by partial ID match
  - `checkboxGetByRole()`: Get checkbox by accessible name

- **Login.page.ts**: Login page interactions
  - `enterUsernameField()`
  - `enterPasswordField()`
  - `clickOnLoginButton()`
  - `assertInvalidCredentialErrorMessage()`

- **ProductCatalog.page.ts**: Product listing and filtering
  - Browse and filter products
  - Select products
  - Sort functionality

- **Cart.page.ts**: Shopping cart operations
  - Add/remove items
  - View cart contents
  - Update quantities

- **Checkout.page.ts**: Checkout information entry
  - Enter shipping details
  - Enter billing information
  - Apply promo codes

- **CheckoutOverview.page.ts**: Order review
  - Verify order items
  - View final pricing
  - Complete purchase

- **CheckOutSuccess.page.ts**: Order confirmation
  - Verify order success message
  - View order details

#### 2. **Custom Fixtures** (`src/fixtures/BaseTest.ts`)

Extends Playwright's base test with custom fixtures that inject page objects:

```typescript
const test = BaseTest.extend<{
  login: Login;
  productCatalog: ProductCatalog;
  cart: Cart;
  // ... other page objects
}>();
```

**Benefits:**
- Automatic page object instantiation
- Clean test code without boilerplate
- Type-safe page object access
- Dependency injection pattern

#### 3. **Test Files** (`src/tests/`)

Tests use the custom fixtures to interact with pages:

```typescript
test('Valid Login', async ({ login, page, productCatalog }) => {
  await login.enterUsernameField('standard_user');
  await login.enterPasswordField('secret_sauce');
  await login.clickOnLoginButton();
  await expect(productCatalog.productListTitle).toBeVisible();
});
```

#### 4. **Utilities** (`src/utils/`)

- **HelperConstants.ts**: Application URLs and configuration
  - Test environment URLs
  - Test data
  - Environment-specific settings

- **Logger** (`logger/`): Winston-based logging
  - Log test execution steps
  - Error logging
  - Performance metrics

### Configuration

**playwright.config.ts** defines:

```typescript
// Global settings
testDir: './src/tests'           // Where to find tests
fullyParallel: true              // Run tests in parallel

// Timeouts
timeout: 180000                  // Test timeout (3 minutes)
expect: { timeout: 30000 }       // Assertion timeout
navigationTimeout: 120000        // Page navigation timeout
actionTimeout: 30000             // Action timeout

// Reporting
reporter: 'html'                 // HTML test reports

// Browsers
projects: [
  { name: 'chromium' },
  { name: 'firefox' },
  { name: 'webkit' }
]

// Tracing
trace: 'on'                      // Record traces on all tests
```

---

## Team Onboarding Guide

### Adding a New Test

#### Step 1: Create a Page Object (if needed)

If testing a new page/component, create a new page object in `src/pages/`:

```typescript
// src/pages/NewFeature.page.ts
import { Page, Locator } from '@playwright/test';
import { Base } from './Base.page';

export class NewFeature extends Base {
  readonly page: Page;
  readonly featureElement: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    super();
    this.page = page;
    this.featureElement = this.getLocatorByDatatest('feature');
    this.submitButton = this.buttonByName('Submit');
  }

  async fillFeatureField(value: string) {
    await this.featureElement.fill(value);
  }

  async submit() {
    await this.submitButton.click();
  }
}
```

#### Step 2: Register the Page Object in Fixtures

Add the new page object to `src/fixtures/BaseTest.ts`:

```typescript
import { NewFeature } from '@pages/NewFeature.page';

const test = BaseTest.extend<{
  // ... existing fixtures
  newFeature: NewFeature;
}>({
  // ... existing fixtures
  newFeature: async ({ page }, use) => {
    await use(new NewFeature(page));
  },
});
```

#### Step 3: Create Test File

Create a new test file in `src/tests/`:

```typescript
// src/tests/NewFeatureTests.spec.ts
import test from '@fixtures/BaseTest';
import { expect } from '@playwright/test';

test.describe('New Feature Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

  test('Test new feature scenario', async ({ newFeature, page }) => {
    await newFeature.fillFeatureField('test value');
    await newFeature.submit();
    await expect(page.locator('text=Success')).toBeVisible();
  });
});
```

### Best Practices

#### 1. **Use Page Objects**
- ❌ **Avoid**: Hard-coding selectors in tests
- ✅ **Do**: Encapsulate selectors in page objects

#### 2. **Meaningful Test Names**
- ❌ **Avoid**: `test('test 1')`
- ✅ **Do**: `test('Valid Login with standard_user credentials')`

#### 3. **Use Data-Test Attributes**
- ❌ **Avoid**: `page.locator('.btn-primary')`
- ✅ **Do**: `this.getLocatorByDatatest('login-button')`

#### 4. **Wait for Elements**
- ❌ **Avoid**: `await page.click('button')`
- ✅ **Do**: `await expect(button).toBeVisible(); await button.click();`

#### 5. **Test Independence**
- Each test should be independent and not rely on previous tests
- Use `beforeEach` for common setup
- Use `afterEach` for cleanup if needed

#### 6. **Descriptive Assertions**
- ❌ **Avoid**: `expect(result).toBeTruthy()`
- ✅ **Do**: `expect(errorMessage).toContainText('Invalid credentials')`

#### 7. **Organize Tests Logically**
- Group related tests in `test.describe()` blocks
- Follow naming convention: `{Feature}Tests.spec.ts`

#### 8. **Use Fixtures for Reusable Page Objects**
- Don't instantiate page objects manually
- Let the test framework handle injection via fixtures
- This keeps tests clean and DRY

### Test Data Management

All test data is centralized in JSON files under `src/testdata/` for easy maintenance and reusability.

#### Test Data Files

**login.json** - Authentication credentials
```json
{
  "validuser": {
    "username": "standard_user",
    "password": "secret_sauce"
  },
  "invaliduser": {
    "username": "vinayak",
    "password": "vinayak123"
  }
}
```

**products.json** - Product information and test scenarios
```json
{
  "products": {
    "backpack": "Sauce Labs Backpack",
    "bikeLight": "Sauce Labs Bike Light",
    "onesie": "Sauce Labs Onesie"
  },
  "testScenarios": {
    "addThreeProducts": [
      "Sauce Labs Backpack",
      "Sauce Labs Bike Light",
      "Sauce Labs Onesie"
    ]
  }
}
```

**checkout.json** - Checkout form data and validation messages
```json
{
  "validCheckoutUser": {
    "firstName": "Vinayak",
    "lastName": "M",
    "postalCode": "560066"
  },
  "errorMessages": {
    "firstNameRequired": "Error: First Name is required"
  }
}
```

#### Using Test Data in Tests

Import and use test data in your test files:

```typescript
import test from '@fixtures/BaseTest';
import loginData from '@testData/login.json';
import productsData from '@testData/products.json';
import checkoutData from '@testData/checkout.json';

test('Login with valid credentials', async ({ login }) => {
  await login.enterUsernameField(loginData.validuser.username);
  await login.enterPasswordField(loginData.validuser.password);
  await login.clickOnLoginButton();
});
```

#### Benefits of Centralized Test Data

- ✅ **Easy Maintenance**: Update credentials and test data in one place
- ✅ **Reusability**: Share test data across multiple tests
- ✅ **Scalability**: Add new test scenarios by extending JSON files
- ✅ **Consistency**: Ensure all tests use the same test data
- ✅ **Security**: Keep sensitive data out of test code

#### Adding New Test Data

1. Create a new JSON file in `src/testdata/`
2. Import it in your test file: `import newData from '@testData/filename.json'`
3. Reference data in tests: `newData.property`

### Code Style and Formatting

#### Format Code with Prettier

```bash
npm run format
```

This runs Prettier on all test files with consistent styling.

#### Prettier Configuration

The project uses standardized Prettier settings (see `prettier.config.cjs`):
- Consistent indentation
- Standardized line length
- Single quotes
- Trailing commas

#### ESLint for Code Quality

The project includes ESLint with TypeScript support for:
- Detecting unused variables
- Enforcing code standards
- Type checking

---

## CI/CD Pipeline Details

### Overview

The CI/CD pipeline runs tests automatically on:
- Pull requests
- Commits to main/develop branches
- Manual triggers

### Pipeline Configuration

The `playwright.config.ts` is configured for CI environments:

```typescript
// CI-specific settings
forbidOnly: !!process.env.CI    // Fail if test.only is left in code
retries: process.env.CI ? 2 : 0 // Retry failed tests twice on CI
workers: process.env.CI ? 1 : undefined // Single worker on CI
```

### Key CI Features

1. **Automatic Retries**: Failed tests automatically retry (up to 2 times) to reduce flakiness

2. **Single-threaded Execution**: Tests run sequentially on CI to:
   - Avoid resource contention
   - Ensure consistent results
   - Reduce infrastructure costs

3. **Trace Collection**: Traces are automatically collected for failed tests for debugging

4. **HTML Reports**: Test reports are generated and can be archived

5. **Cross-browser Testing**: Tests run on all three browsers (Chromium, Firefox, WebKit)

### Setting Up GitHub Actions (Example)

Create `.github/workflows/tests.yml`:

```yaml
name: E2E Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Install Playwright
        run: npx playwright install --with-deps
      
      - name: Run tests
        run: npm test
      
      - name: Upload report
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
```

### Environment Variables

Configure environment variables for different environments:

```bash
# .env.dev
ENVIRONMENT=dev
BASE_URL=https://www.saucedemo.com/

# .env.staging
ENVIRONMENT=staging
BASE_URL=https://staging.saucedemo.com/
```

Load in your test configuration using `dotenv`:

```typescript
import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
```

---

## Project Structure

```
Web/
├── src/
│   ├── fixtures/
│   │   └── BaseTest.ts              # Custom test fixtures with page object injection
│   ├── pages/
│   │   ├── Base.page.ts             # Base page object with common methods
│   │   ├── Login.page.ts            # Login page interactions
│   │   ├── ProductCatalog.page.ts   # Product listing and filtering
│   │   ├── Cart.page.ts             # Shopping cart operations
│   │   ├── Checkout.page.ts         # Checkout information
│   │   ├── CheckoutOverview.page.ts # Order review
│   │   └── CheckOutSuccess.page.ts  # Order confirmation
│   ├── tests/
│   │   ├── LoginTests.spec.ts       # Authentication tests
│   │   ├── AddProductsToCartTests.spec.ts  # Cart tests
│   │   ├── CartCheckoutTests.spec.ts       # Checkout tests
│   │   └── E2ETests.spec.ts                # End-to-end tests
│   ├── testdata/
│   │   ├── login.json               # Login credentials (valid/invalid users)
│   │   ├── products.json            # Product data and test scenarios
│   │   └── checkout.json            # Checkout form data and error messages
│   └── utils/
│       ├── constants/
│       │   └── HelperConstants.ts   # URLs, test data, configuration
│       └── logger/                  # Logging utilities
├── playwright.config.ts             # Playwright configuration
├── playwright-report/               # HTML test reports (generated)
├── test-results/                    # Test results (generated)
├── package.json                     # Dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
├── prettier.config.cjs              # Code formatting rules
└── README.md                        # This file
```

---

## Troubleshooting

### Common Issues and Solutions

#### Tests Timeout

**Problem**: Tests exceed the timeout limit

**Solution**:
1. Check if the application is responding slowly
2. Increase timeout in `playwright.config.ts`:
   ```typescript
   timeout: 300000  // Increase to 5 minutes
   ```
3. Debug specific slow operations using debug mode: `npm run debug`

#### Flaky Tests

**Problem**: Tests pass sometimes but fail other times

**Solution**:
1. **Add proper waits**: Use `expect()` instead of `waitForTimeout()`
   ```typescript
   // ❌ Bad
   await page.waitForTimeout(2000);
   
   // ✅ Good
   await expect(element).toBeVisible();
   ```
2. **Review test independence**: Ensure tests don't depend on execution order
3. **Check for race conditions**: Use `waitForLoadState()` for navigation

#### Element Not Found

**Problem**: Locator returns no elements

**Solution**:
1. Use Playwright Inspector: `npm run debug`
2. Verify selector is correct using Inspector
3. Check if element is within an iframe
4. Ensure element is visible (not hidden by CSS)

#### Authentication Issues

**Problem**: Login fails in tests but works manually

**Solution**:
1. Verify credentials in `HelperConstants.ts`
2. Check if cookies are being properly handled
3. Add context/storage state management if needed

#### Memory Issues

**Problem**: Tests run slowly or crash with memory errors

**Solution**:
1. Reduce workers: `npx playwright test --workers=1`
2. Reduce number of retries in config
3. Check for resource leaks in page objects

### Getting Help

- **Playwright Docs**: https://playwright.dev
- **Debug Mode**: `npm run debug` for interactive debugging
- **Trace Viewer**: Check traces in `playwright-report/trace/`
- **GitHub Issues**: Check project issues and PRs

---

## Additional Resources

- [Playwright Documentation](https://playwright.dev)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [Test Fixtures](https://playwright.dev/docs/test-fixtures)
- [TypeScript Support](https://playwright.dev/docs/typescript)
- [Debugging Tests](https://playwright.dev/docs/debug)

---

## Contributing

1. Create a new branch for your feature
2. Write tests following the guidelines above
3. Run `npm run format` to format code
4. Ensure all tests pass: `npm test`
5. Submit a pull request

---

## License

ISC

---

## Contact & Support

For questions or support, please create an issue in the GitHub repository or contact the team.

**Repository**: https://github.com/VinayakHM/Web