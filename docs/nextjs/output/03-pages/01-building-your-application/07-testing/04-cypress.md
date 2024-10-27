# Setting up Cypress with Next.js

Learn how to set up Next.js with Cypress for End-to-End (E2E) and Component Testing.

## Introduction

Cypress is a powerful testing framework that allows you to write tests for your applications. This guide will help you integrate Cypress with your Next.js application.

## Installation

1. Install Cypress as a development dependency:

   ```
   npm install --save-dev cypress
   ```

2. Open Cypress for the first time:

   ```
   npx cypress open
   ```

   This command will create a `cypress` folder in your project directory.

## Configuration

### Cypress Configuration File

Create a `cypress.config.js` file in the root of your project:

```javascript
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
  },
});
```

### Adding Scripts

Add the following scripts to your `package.json`:

```json
"scripts": {
  "cypress:open": "cypress open",
  "cypress:run": "cypress run"
}
```

## Writing Tests

### End-to-End Tests

Create a new file in the `cypress/e2e` directory, for example, `home.spec.js`:

```javascript
describe("Home Page", () => {
  it("should load the home page", () => {
    cy.visit("/");
    cy.contains("Welcome to Next.js!");
  });
});
```

### Component Tests

For component testing, create a new file in the `cypress/component` directory, for example, `button.spec.js`:

```javascript
import { mount } from "cypress/react";
import Button from "../../components/Button";

describe("Button Component", () => {
  it("should render correctly", () => {
    mount(<Button label="Click Me" />);
    cy.contains("Click Me");
  });
});
```

## Running Tests

To run your tests, use the following commands:

- For opening the Cypress UI:

  ```
  npm run cypress:open
  ```

- For running tests in headless mode:

  ```
  npm run cypress:run
  ```

## Conclusion

You have successfully set up Cypress with your Next.js application. You can now write and run both End-to-End and Component tests to ensure your application works as expected.