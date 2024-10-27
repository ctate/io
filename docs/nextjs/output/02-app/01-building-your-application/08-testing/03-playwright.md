# Setting up Playwright with Next.js

Playwright is a testing framework that automates Chromium, Firefox, and WebKit with a single API, enabling End-to-End (E2E) testing. This guide outlines how to set up Playwright with Next.js and write your first tests.

## Quickstart

To quickly start, use `create-next-app` with the with-playwright example. This creates a Next.js project with Playwright configured.

```bash
npx create-next-app@latest --example with-playwright with-playwright-app
```

## Manual setup

To install Playwright, run:

```bash
npm init playwright
# or
yarn create playwright
# or
pnpm create playwright
```

Follow the prompts to set up and configure Playwright, including adding a `playwright.config.ts` file. Refer to the Playwright installation guide for detailed instructions.

## Creating your first Playwright E2E test

Create two new Next.js pages:

**App Directory Structure:**

```tsx
// app/page.tsx
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

```tsx
// app/about/page.tsx
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

**Pages Directory Structure:**

```tsx
// pages/index.ts
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/about">About</Link>
    </div>
  )
}
```

```tsx
// pages/about.ts
import Link from 'next/link'

export default function About() {
  return (
    <div>
      <h1>About</h1>
      <Link href="/">Home</Link>
    </div>
  )
}
```

Add a test to verify navigation:

```ts
// tests/example.spec.ts
import { test, expect } from '@playwright/test'

test('should navigate to the about page', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await page.click('text=About')
  await expect(page).toHaveURL('http://localhost:3000/about')
  await expect(page.locator('h1')).toContainText('About')
})
```

**Note**: Use `page.goto("/")` if you add `"baseURL": "http://localhost:3000"` to the `playwright.config.ts`.

### Running your Playwright tests

Ensure your Next.js server is running. Run `npm run build` and `npm run start`, then execute `npx playwright test` in another terminal to run the tests.

**Note**: You can use the `webServer` feature to let Playwright start the development server.

### Running Playwright on Continuous Integration (CI)

Playwright runs tests in headless mode by default. To install all Playwright dependencies, run `npx playwright install-deps`.

For more information on Playwright and Continuous Integration, refer to the following resources:

- Next.js with Playwright example
- Playwright on your CI provider
- Playwright Discord