# Setting up Playwright with Next.js

Learn how to set up Next.js with Playwright for End-to-End (E2E) and Integration testing.

## Introduction

Playwright is a powerful tool for automating web applications. This guide will help you integrate Playwright with your Next.js application for effective testing.

## Installation

1. Install Playwright and its dependencies:
   ```
   npm install -D playwright
   ```

2. Install the browsers:
   ```
   npx playwright install
   ```

## Configuration

Create a Playwright configuration file named `playwright.config.js` in the root of your project:

```javascript
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  reporter: 'html',
});
```

## Writing Tests

Create a test file in the `tests` directory, for example, `example.spec.js`:

```javascript
const { test, expect } = require('@playwright/test');

test('homepage has title', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page).toHaveTitle(/Next.js/);
});
```

## Running Tests

To run your tests, use the following command:

```
npx playwright test
```

## Conclusion

You have successfully set up Playwright with Next.js for E2E and Integration testing. For more advanced configurations and features, refer to the Playwright documentation.