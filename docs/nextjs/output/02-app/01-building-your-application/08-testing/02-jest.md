# Setting up Jest with Next.js

Jest and React Testing Library are frequently used together for **Unit Testing** and **Snapshot Testing**. This guide will show you how to set up Jest with Next.js and write your first tests.

**Good to know:** Since `async` Server Components are new to the React ecosystem, Jest currently does not support them. While you can still run **unit tests** for synchronous Server and Client Components, we recommend using **E2E tests** for `async` components.

## Quickstart

You can use `create-next-app` with the Next.js example `with-jest` to quickly get started:

```bash
npx create-next-app@latest --example with-jest with-jest-app
```

## Manual setup

To set up Jest, install `jest` and the following packages as dev dependencies:

```bash
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom ts-node
# or
yarn add -D jest jest-environment-jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom ts-node
# or
pnpm install -D jest jest-environment-jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom ts-node
```

Generate a basic Jest configuration file by running the following command:

```bash
npm init jest@latest
# or
yarn create jest@latest
# or
pnpm create jest@latest
```

Update your config file to use `next/jest`:

```ts
import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './',
})

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
}

export default createJestConfig(config)
```

```js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
}

module.exports = createJestConfig(config)
```

`next/jest` automatically configures Jest for you, including:

- Setting up `transform` using the Next.js Compiler
- Auto mocking stylesheets, image imports, and `next/font`
- Loading `.env` into `process.env`
- Ignoring `node_modules` and `.next` from test resolving
- Loading `next.config.js` for flags that enable SWC transforms

**Good to know:** To test environment variables directly, load them manually in a separate setup script or in your `jest.config.ts` file.

## Setting up Jest (with Babel)

If you opt out of the Next.js Compiler and use Babel instead, you will need to manually configure Jest and install `babel-jest` and `identity-obj-proxy`.

Here are the recommended options to configure Jest for Next.js:

```js
module.exports = {
  collectCoverage: true,
  coverageProvider: 'v8',
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!<rootDir>/out/**',
    '!<rootDir>/.next/**',
    '!<rootDir>/*.config.js',
    '!<rootDir>/coverage/**',
  ],
  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$': `<rootDir>/__mocks__/fileMock.js`,
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '@next/font/(.*)': `<rootDir>/__mocks__/nextFontMock.js`,
    'next/font/(.*)': `<rootDir>/__mocks__/nextFontMock.js`,
    'server-only': `<rootDir>/__mocks__/empty.js`,
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
}
```

Create the mock files `fileMock.js` and `styleMock.js` inside a `__mocks__` directory:

```js
module.exports = 'test-file-stub'
```

```js
module.exports = {}
```

To handle fonts, create the `nextFontMock.js` file inside the `__mocks__` directory:

```js
module.exports = new Proxy(
  {},
  {
    get: function getter() {
      return () => ({
        className: 'className',
        variable: 'variable',
        style: { fontFamily: 'fontFamily' },
      })
    },
  }
)
```

## Optional: Handling Absolute Imports and Module Path Aliases

If your project is using Module Path Aliases, configure Jest to resolve the imports by matching the paths option in the `jsconfig.json` file with the `moduleNameMapper` option in the `jest.config.js` file.

Example `tsconfig.json` or `jsconfig.json`:

```json
{
  "compilerOptions": {
    "module": "esnext",
    "moduleResolution": "bundler",
    "baseUrl": "./",
    "paths": {
      "@/components/*": ["components/*"]
    }
  }
}
```

Example `jest.config.js`:

```js
moduleNameMapper: {
  '^@/components/(.*)$': '<rootDir>/components/$1',
}
```

## Optional: Extend Jest with custom matchers

`@testing-library/jest-dom` includes a set of convenient custom matchers. You can import the custom matchers for every test by adding the following option to the Jest configuration file:

```ts
setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
```

Then, inside `jest.setup.ts`, add the following import:

```ts
import '@testing-library/jest-dom'
```

**Good to know:** `extend-expect` was removed in `v6.0`, so if you are using `@testing-library/jest-dom` before version 6, you will need to import `@testing-library/jest-dom/extend-expect` instead.

## Add a test script to `package.json`:

Add a Jest `test` script to your `package.json` file:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
```

`jest --watch` will re-run tests when a file is changed.

### Creating your first test:

Create a folder called `__tests__` in your project's root directory.

Example for a test checking if the `<Home />` component renders a heading:

```jsx
export default function Home() {
  return <h1>Home</h1>
}
```

```jsx
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from '../pages/index'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', { level: 1 })

    expect(heading).toBeInTheDocument()
  })
})
```

Optionally, add a snapshot test to keep track of any unexpected changes in your component:

```jsx
import { render } from '@testing-library/react'
import Home from '../pages/index'

it('renders homepage unchanged', () => {
  const { container } = render(<Home />)
  expect(container).toMatchSnapshot()
})
```

## Running your tests

Run the following command to execute your tests:

```bash
npm run test
# or
yarn test
# or
pnpm test
```

## Additional Resources

For further reading, you may find these resources helpful:

- Next.js with Jest example
- Jest Docs
- React Testing Library Docs
- Testing Playground - use good testing practices to match elements.