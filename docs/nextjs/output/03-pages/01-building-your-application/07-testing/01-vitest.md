# Setting up Vitest with Next.js

Learn how to set up Next.js with Vitest and React Testing Library - two popular unit testing libraries.

## Introduction

This guide provides instructions for integrating Vitest into a Next.js application, enabling efficient unit testing.

## Prerequisites

- Node.js installed
- A Next.js application

## Installation

1. Install Vitest and React Testing Library:

   ```
   npm install --save-dev vitest @testing-library/react
   ```

2. Create a configuration file for Vitest:

   Create a file named `vitest.config.js` in the root of your project with the following content:

   ```javascript
   import { defineConfig } from 'vitest/config';

   export default defineConfig({
     test: {
       environment: 'jsdom',
     },
   });
   ```

## Writing Tests

1. Create a test file in your component directory, for example, `MyComponent.test.js`.

2. Write your test cases using Vitest and React Testing Library:

   ```javascript
   import { render, screen } from '@testing-library/react';
   import MyComponent from './MyComponent';

   test('renders MyComponent', () => {
     render(<MyComponent />);
     const linkElement = screen.getByText(/my component/i);
     expect(linkElement).toBeInTheDocument();
   });
   ```

## Running Tests

Run your tests using the following command:

```
npx vitest
```

## Conclusion

You have successfully set up Vitest with Next.js. You can now write and run tests for your components using Vitest and React Testing Library.