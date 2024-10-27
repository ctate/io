# Setting up Cypress with Next.js

Cypress is a test runner used for End-to-End (E2E) and Component Testing. This guide shows how to set up Cypress with Next.js and write your first tests.

**Warning:**
- For component testing, Cypress does not support Next.js version 14 and `async` Server Components. Component testing works with Next.js version 13. E2E testing is recommended for `async` Server Components.
- Cypress versions below 13.6.3 do not support TypeScript version 5 with `moduleResolution:"bundler"`. This is resolved in Cypress version 13.6.3 and later.

## Quickstart

Use `create-next-app` with the with-cypress example to quickly get started.

```bash
npx create-next-app@latest --example with-cypress with-cypress-app
```

## Manual setup

To manually set up Cypress, install `cypress` as a dev dependency:

```bash
npm install -D cypress
# or
yarn add -D cypress
# or
pnpm install -D cypress
```

Add the Cypress `open` command to the `package.json` scripts field:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "cypress:open": "cypress open"
  }
}
```

Run Cypress for the first time:

```bash
npm run cypress:open
```

You can configure E2E Testing and/or Component Testing, which will create a `cypress.config.js` file and a `cypress` folder in your project.

## Creating your first Cypress E2E test

Ensure your `cypress.config.js` file has the following configuration:

```ts
import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
  },
})
```

```js
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
  },
})
```

Create two new Next.js files:

```jsx
// app/page.js
import Link from 'next/link'

export default function Page() {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/about">About</Link>
    </div>
  )
}
```

```jsx
// app/about/page.js
import Link from 'next/link'

export default function Page() {
  return (
    <div>
      <h1>About</h1>
      <Link href="/">Home</Link>
    </div>
  )
}
```

Add a test to check navigation:

```js
// cypress/e2e/app.cy.js
describe('Navigation', () => {
  it('should navigate to the about page', () => {
    cy.visit('http://localhost:3000/')
    cy.get('a[href*="about"]').click()
    cy.url().should('include', '/about')
    cy.get('h1').contains('About')
  })
})
```

### Running E2E Tests

Run `npm run build && npm run start` to build your Next.js application, then run `npm run cypress:open` in another terminal to start Cypress.

**Good to know:**
- Use `cy.visit("/")` by adding `baseUrl: 'http://localhost:3000'` to `cypress.config.js`.
- Install `start-server-and-test` to run the Next.js production server with Cypress.

## Creating your first Cypress component test

Select **Component Testing** in the Cypress app, then select **Next.js**. A `cypress/component` folder will be created, and `cypress.config.js` will be updated.

Ensure your `cypress.config.js` file has the following configuration:

```ts
import { defineConfig } from 'cypress'

export default defineConfig({
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
})
```

Add a test to validate a component:

```tsx
// cypress/component/about.cy.tsx
import Page from '../../app/page'

describe('<Page />', () => {
  it('should render and display expected content', () => {
    cy.mount(<Page />)
    cy.get('h1').contains('Home')
    cy.get('a[href="/about"]').should('be.visible')
  })
})
```

**Good to know:**
- Cypress does not support component testing for `async` Server Components. Use E2E testing instead.
- Features like `<Image />` may not function without a Next.js server.

### Running Component Tests

Run `npm run cypress:open` to start Cypress and run your component testing suite.

## Continuous Integration (CI)

Run Cypress headlessly using the `cypress run` command for CI environments:

```json
{
  "scripts": {
    "e2e": "start-server-and-test dev http://localhost:3000 \"cypress open --e2e\"",
    "e2e:headless": "start-server-and-test dev http://localhost:3000 \"cypress run --e2e\"",
    "component": "cypress open --component",
    "component:headless": "cypress run --component"
  }
}
```

Learn more about Cypress and Continuous Integration from these resources:
- Next.js with Cypress example
- Cypress Continuous Integration Docs
- Cypress GitHub Actions Guide
- Official Cypress GitHub Action
- Cypress Discord